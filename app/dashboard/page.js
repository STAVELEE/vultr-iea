import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { supabase } from '../../lib/supabase';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-center p-10">🔒 You must be logged in to view this page.</div>;
  }

  const email = session.user.email;

  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('owner', email)
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-6 text-red-600">❌ Failed to load servers: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🚀 Your Servers</h1>
      {data.length === 0 ? (
        <p>No servers found.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((server) => (
            <li key={server.id} className="p-4 border rounded shadow">
              <div><strong>Label:</strong> {server.label}</div>
              <div><strong>Region:</strong> {server.region}</div>
              <div><strong>Plan:</strong> {server.plan}</div>
              <div><strong>Created:</strong> {server.created_at}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
