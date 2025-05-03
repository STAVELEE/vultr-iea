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

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/create-server', { method: 'POST' });
      const data = await res.json();
  
      if (data.success) {
        alert("Server Created Successfully!");
      } else {
        alert("Server Creation Failed!");
      }
    } catch (error) {
      console.error("Error creating server:", error);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Server Dashboard</h1>
      <button onClick={handleCreate}>Create Server</button>
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