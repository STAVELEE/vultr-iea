// 예시 코드 - Vultr API 호출 부분 (올바르게 수정된 코드)
const response = await fetch('https://api.vultr.com/v2/servers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VULTR_API_KEY}`, // Vultr API 키
    },
    body: JSON.stringify({
      region: region, // 서버 지역
      plan: plan,     // 서버 플랜
      os: os,         // 운영 체제
      label: label,   // 서버 이름
    }),
  });
  const data = await response.json();