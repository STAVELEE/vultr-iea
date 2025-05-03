// lib/vultr.js
import axios from 'axios';

const vultr = axios.create({
  baseURL: 'https://api.vultr.com/v2',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_VULTR_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export async function createVultrServer({ region, plan, os, label }) {
  try {
    const res = await vultr.post('/instances', {
      region,
      plan,
      os_id: os,
      label,
      backups: 'disabled',
      tags: ['panel']
    });

    return res.data;
  } catch (err) {
    console.error('Vultr API Error:', err.response?.data || err);
    throw new Error(err.response?.data?.error || 'Vultr server creation failed');
  }
}
