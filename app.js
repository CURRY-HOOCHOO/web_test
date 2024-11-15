const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // public 폴더에서 정적 파일 제공

// 저장 기능
app.post('/save', (req, res) => {
  const { uniqueId, data } = req.body;
  const filePath = './applications.json';

  let applications = [];
  if (fs.existsSync(filePath)) {
    applications = JSON.parse(fs.readFileSync(filePath));
  }

  applications.push({ uniqueId, data });
  fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));

  res.send({ success: true, message: 'Application saved successfully.' });
});

// 불러오기 기능
app.get('/retrieve/:uniqueId', (req, res) => {
  const { uniqueId } = req.params;
  const filePath = './applications.json';

  if (fs.existsSync(filePath)) {
    const applications = JSON.parse(fs.readFileSync(filePath));
    const application = applications.find(app => app.uniqueId === uniqueId);

    if (application) {
      return res.send({ success: true, data: application.data });
    }
  }

  res.status(404).send({ success: false, message: 'Application not found.' });
});

// 서버 실행
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
