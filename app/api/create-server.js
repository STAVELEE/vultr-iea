// api/create-server.js
import { supabase } from '../../lib/supabase';
import { createVultrServer } from '../../lib/vultr';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { region, plan, os, label, email } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('servers')
      .insert([
        { region, plan, os, label, email },
      ]);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, server: data });
  } catch (err) {
    console.error('Server creation failed:', err);
    res.status(500).json({ success: false, message: 'Failed to create server' });
  }
}