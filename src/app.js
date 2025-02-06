const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

const errorHandler = require('./middlewares/error/errorHandler');
const userRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middlewares/auth.middleware');

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(authMiddleware);
app.use(userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
