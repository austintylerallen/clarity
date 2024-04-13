const Sequelize = require('sequelize');
const dbConfig = require('./config/database');
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const signupRouter = require('./routes/views/signup'); // Require the signup router
const politicianRoutes = require('./routes/politicianRoutes');
const loginRouter = require('./routes/login'); // Require the login router

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);
const app = express();

// Set up Handlebars as the template engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts/') // Specify the layout directory explicitly
}));
app.set('view engine', 'hbs');  // Set the view engine to Handlebars
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set Content-Security-Policy header
app.use((req, res, next) => {
    try {
        console.log('Setting Content-Security-Policy header...');
        res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'self' 'unsafe-inline' http://localhost:3001/css/main.css; img-src 'self'; font-src 'self' http://localhost:3001/css/fonts/");
        next();
    } catch (error) {
        console.error('Error setting CSP header:', error);
        next(error); // Pass the error to the error handling middleware
    }
});

app.use('/politicians', politicianRoutes);

// Use the login router with base URL '/login'
app.use('/login', loginRouter);

// Define route handler for the home page
app.get('/', (req, res) => {
    console.log('Rendering home page...');
    res.render('home', { layout: 'main' }); // Render the home view file with the main layout
});

// Define route handler for the about page
app.get('/about', (req, res) => {
    console.log('Rendering about page...');
    res.render('about', { layout: 'main' }); // Render the about view file with the main layout
});

// Use the signup router with base URL '/signup'
app.use('/signup', signupRouter);

// Define route handler for the dashboard page
app.get('/dashboard', (req, res) => {
    console.log('Rendering dashboard page...');
    res.render('dashboard', { layout: 'main' }); // Render the dashboard view file with the main layout
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

console.log('Express server initialized.');
