require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/tasks');
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


module.exports = app;