const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cors = require("cors")

app.use(cors())
// Ensure 'uploads' folder exists
const fs = require('fs');
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder); // Create 'uploads' folder if not exists
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send('File upload failed');
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(uploadFolder));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
