// pages/api/create-server.js
const response = await fetch('https://api.vultr.com/v2/servers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VULTR_API_KEY}`,
    },
    body: JSON.stringify({
      region: region,
      plan: plan,
      os: os,
      label: label,
    }),
  });
  const data = await response.json();
  