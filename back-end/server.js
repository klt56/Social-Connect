// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const communityRoutes = require('./routes/community.routes');
const messagesRoutes = require('./routes/messages.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Create an instance of Express
const app = express();

// Define the PORT variable
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// JWT authentication middleware
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/messages', messagesRoutes);

// Modify the post creation route to handle file uploads
app.post('/api/post', requireAuth, upload.single('file'), async (req, res) => {
  try {
    // Access uploaded file information with req.file
    // Process other post data
    // ...
    res.status(200).json({ message: 'Post créé avec succès.' });
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du post.' });
  }
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io with CORS options
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // Adjust as needed
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  },
});
// Ajouter cette ligne

// Ajoutez cette ligne pour inclure les routes des communautés


// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinCommunity', (communityId) => {
    socket.join(communityId);
    console.log(`User joined community: ${communityId}`);
  });

  socket.on('sendMessage', async (data) => {
    const { communityId, messageContent, senderId } = data;

    // Ensure you have imported your Message model
    const Message = require('./models/message.model');

    const message = new Message({
      sender: senderId,
      community: communityId,
      content: messageContent,
    });
    await message.save();

    // Emit the message to all clients in the community
    io.to(communityId).emit('receiveMessage', {
      senderId,
      messageContent,
      timestamp: message.timestamp,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
