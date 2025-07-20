const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const adayRoutes = require('./routes/aday');
const egitimRoutes = require('./routes/egitim');
const isDeneyimRoutes = require('./routes/is_deneyim');
const yetkinlikRoutes = require('./routes/yetkinlik');
const sosyalRoutes = require('./routes/sosyal');
const referansRoutes = require('./routes/referans');
const tercihRoutes = require('./routes/tercih');
const cvRoutes = require('./routes/cv');
const ozetRoutes = require('./routes/ozet');
const illerRoutes = require('./routes/iller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/ozet', ozetRoutes);
app.use('/api', authRoutes);
app.use('/api', adayRoutes);
app.use('/api', egitimRoutes);
app.use('/api', isDeneyimRoutes);
app.use('/api', yetkinlikRoutes);
app.use('/api', sosyalRoutes);
app.use('/api', referansRoutes);
app.use('/api', tercihRoutes);
app.use('/api', cvRoutes);
app.use('/api', illerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));