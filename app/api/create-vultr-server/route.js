// app/api/create-vultr-server/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { createVultrServer } from '../../../lib/vultr';

export async function POST(req) {
  const body = await req.json();
  const { region, plan, os, label, email } = body;

  try {
    const result = await createVultrServer({ region, plan, os, label });

    if (!result || !result.instance) {
      return NextResponse.json({ success: false, message: 'Vultr server creation failed' });
    }

    const { id: server_id, ...rest } = result.instance;

    const { error } = await supabase.from('servers').insert({
      server_id,
      label,
      region,
      plan,
      os_id: os,
      owner: email,
      created_at: new Date().toISOString()
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Create Server Error]', err);
    return NextResponse.json({ success: false, error: err.message });
  }
}