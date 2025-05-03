// pages/api/create-server.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // 서버 생성 로직
      try {
        // 예시: Vultr API를 호출하여 서버 생성
        const server = await createVultrServer();
        res.status(200).json({ success: true, server });
      } catch (error) {
        res.status(500).json({ success: false, message: "Server creation failed" });
      }
    } else {
      res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
  }
  