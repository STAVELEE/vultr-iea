import fetch from 'node-fetch';

const VULTR_API_URL = 'https://api.vultr.com/v2/'; // Vultr API URL
const VULTR_API_KEY = process.env.VULTR_API_KEY; // 환경변수에서 API 키 가져오기

export async function createVultrServer(region, plan, os, label) {
  const url = `${VULTR_API_URL}instances`;

  const body = JSON.stringify({
    region,
    plan,
    os,
    label,
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${VULTR_API_KEY}`,
    },
    body,
  });

  const result = await response.json();
  if (result.error) {
    return { success: false, message: result.error };
  }

  return { success: true, server: result.instance };
}