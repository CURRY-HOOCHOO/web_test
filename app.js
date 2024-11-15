// app.js
const express = require('express');
const app = express();
const path = require('path');

// 포트 번호 설정 (예: 3000번 포트)
const PORT = 3000;

// HTML 파일 제공 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로로 접속할 때 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
