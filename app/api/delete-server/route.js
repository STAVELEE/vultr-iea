import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { deleteVultrServer } from '../../../lib/vultr'; // Vultr API로 서버 삭제 함수

export async function DELETE(req) {
  const { server_id } = await req.json();
  
  try {
    // 서버 정보 조회
    const { data: server, error: fetchError } = await supabase
      .from('servers')
      .select('*')
      .eq('server_id', server_id)
      .single();

    if (fetchError || !server) {
      throw new Error('Server not found');
    }

    // Vultr에서 서버 삭제
    const deleteResult = await deleteVultrServer(server_id);

    // 서버가 삭제되었으면, Supabase에서도 삭제
    const { error: deleteError } = await supabase
      .from('servers')
      .delete()
      .eq('server_id', server_id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ success: true, message: 'Server deleted successfully' });
  } catch (err) {
    console.error('[Delete Server Error]', err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
