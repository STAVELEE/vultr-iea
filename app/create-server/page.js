// app/create-server/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { supabase } from '../../lib/supabase';  // Supabase client import
import { createVultrServer } from '../../lib/vultr';  // Vultr API client import  

export default function CreateServerPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [regions, setRegions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [oses, setOses] = useState([]);

  const [region, setRegion] = useState('');
  const [plan, setPlan] = useState('');
  const [os, setOs] = useState('');
  const [label, setLabel] = useState('MyServer');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session) return;

    async function fetchVultrData() {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_VULTR_API_KEY}`
        };

        const [regionRes, planRes, osRes] = await Promise.all([
          axios.get('https://api.vultr.com/v2/regions', { headers }),
          axios.get('https://api.vultr.com/v2/plans', { headers }),
          axios.get('https://api.vultr.com/v2/os', { headers })
        ]);

        setRegions(regionRes.data.regions);
        setPlans(planRes.data.plans);
        setOses(osRes.data.os.filter(o => ['ubuntu', 'rocky', 'windows', 'debian', 'centos'].includes(o.name.toLowerCase())));
      } catch (error) {
        console.error('Error fetching Vultr data:', error);
        alert('Failed to fetch server data. Please try again later.');
      }
    }

    fetchVultrData();
  }, [session]);

  const handleCreate = async () => {
    if (!region || !plan || !os || !label) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/create-server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          region,
          plan,
          os,
          label,
          email: session.user.email
        })
      });

      const data = await res.json();

      if (data.success) {
        router.push('/dashboard');
      } else {
        alert('Server creation failed: ' + data.message);
      }
    } catch (err) {
      console.error('Error creating server:', err);
      alert('Error creating server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠 Create New Server</h1>

      <label className="block mt-4">Server Name</label>
      <input value={label} onChange={e => setLabel(e.target.value)} className="border p-2 w-full" />

      <label className="block mt-4">Region</label>
      <select className="border p-2 w-full" value={region} onChange={e => setRegion(e.target.value)}>
        <option value="">-- Select Region --</option>
        {regions.map(r => (
          <option key={r.id} value={r.id}>{r.city} ({r.country})</option>
        ))}
      </select>

      <label className="block mt-4">Plan</label>
      <select className="border p-2 w-full" value={plan} onChange={e => setPlan(e.target.value)}>
        <option value="">-- Select Plan --</option>
        {plans.map(p => (
          <option key={p.id} value={p.id}>{p.description}</option>
        ))}
      </select>

      <label className="block mt-4">Operating System</label>
      <select className="border p-2 w-full" value={os} onChange={e => setOs(e.target.value)}>
        <option value="">-- Select OS --</option>
        {oses.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>

      <button
        onClick={handleCreate}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Server'}
      </button>
    </div>
  );
}