require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin:
    'https://port-0-react-gongcha-migration-ss7z32llwcg7ke3.sel5.cloudtype.app/',
  methods: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ extended: false }));
app.use(morgan('dev'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/myPage', require('./routes/api/myPage'));
app.use('/api/comment', require('./routes/api/comment'));
app.use('/api/reply', require('./routes/api/reply-comment'));

//이것을 사용하여 노드 js 서버에있는 이미지를 클라이언트에 표시(react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../build')));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // 모든 자바스크립트와 css 파일 같은 static한 파일들은 이곳에서 처리가 된다.
  app.use(express.static('/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
