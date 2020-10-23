const express = require('express');
const fileUploader = require('express-fileupload');

const app = express();
app.use(fileUploader());

app.listen(5000, () => {
  console.log('listenning');
});

app.post('/upload', (req, res) => {
  if (req.files === null) {
    res.status(400).json('no file was found');
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.send(500).json(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
