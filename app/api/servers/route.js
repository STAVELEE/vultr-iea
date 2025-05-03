import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const { data: servers, error } = await supabase.from('servers').select('*');
    
    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, servers });
  } catch (err) {
    console.error('[Get Servers Error]', err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
