const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const errorHandler = require('./config/errorHandler');
const userRoutes = require('./routes/userRoutes');


const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies

app.use(errorHandler);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
