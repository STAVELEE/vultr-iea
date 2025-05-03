'use client';

import { useEffect, useState } from 'react';

function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch('/api/servers');
      const data = await response.json();

      console.log(data);  // 응답 확인하기

      if (data.success) {
        setServers(data.servers);
      } else {
        console.error('Failed to load servers:', data.error);
      }
      setLoading(false);
    };

    fetchServers();
  }, []);

  const handleDelete = async (server_id) => {
    const response = await fetch('/api/delete-server', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ server_id }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Server deleted successfully');
      setServers(servers.filter((server) => server.server_id !== server_id));
    } else {
      alert('Error deleting server');
    }
  };

  const handleCreateServer = async () => {
    const response = await fetch('/api/create-server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        region: 'New York',
        plan: 'Standard',
        os: 'Ubuntu',
        label: 'New Server',
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Server created successfully');
      setServers([...servers, data.server]);
    } else {
      alert('Error creating server');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Server Dashboard</h1>
      <button onClick={handleCreateServer}>Create Server</button> {/* 버튼 추가 */}
      <ul>
        {servers.map((server) => (
          <li key={server.server_id}>
            <h3>{server.label}</h3>
            <p>{server.region}</p>
            <p>{server.plan}</p>
            <button onClick={() => handleDelete(server.server_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;