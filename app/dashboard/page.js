'use client';

import { useEffect, useState } from 'react';

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


function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch('/api/servers');
      const data = await response.json();

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

  return (
    <div>
      <h1>Server Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
}

export default Dashboard; 