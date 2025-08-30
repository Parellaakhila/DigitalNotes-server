const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');   
const noteRoutes = require('./routes/NotesRoutes');

const app = express();

// ✅ Connect to MongoDB (single connection)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

// ✅ CORS setup
const allowedOrigins = [
  'https://digital-notes-application.vercel.app',
  'https://digital-notes-client-fu54.vercel.app/',
  'http://localhost:5173',
  'http://localhost:5000'
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('✅ NoteIt backend is running!');
});
app.use('/api/auth', authRoutes);  
app.use('/api/notes', noteRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
