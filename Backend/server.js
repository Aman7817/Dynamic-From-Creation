import express from 'express';
import cors from 'cors';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const app = express();

// CORS configuration
// Allow requests from the frontend running on port 5173
app.use(cors({
  origin: 'http://localhost:5173', // main frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


// फाइल अपलोड रूट
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ 
    success: true,
    fileUrl: `/uploads/${req.file.filename}`
  });
});

app.use('/uploads', express.static('uploads'));

app.post('/api/submit-form', (req, res) => {
  console.log('Form data received:', req.body);
  res.json({ 
    success: true,
    data: req.body 
  });
});



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});