const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const sequelize = require('./config/database');
const politicianRoutes = require('./routes/politicianRoutes');
const loginRouter = require('./routes/views/login');
const signupRouter = require('./routes/views/signup');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Initialize Passport and set it up to work with Express
require('./config/passport')(passport);
app.use(passport.initialize());

// Set up Handlebars as the template engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts/')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request bodies with JSON payloads
app.use(bodyParser.json());

// Define base routes
app.get('/', (req, res) => {
    res.render('home', { layout: 'main' });
});
app.get('/about', (req, res) => {
    res.render('about', { layout: 'main' });
});

// Mount specific feature routers
app.use('/politicians', politicianRoutes);
app.use('/auth', authRoutes);  // This includes /login, /logout, /forgot-password as defined in authRoutes.js

// Separate routers for login and signup under specific paths
app.use('/login', loginRouter);  // Ensure this only handles login form display and submission if needed separately
app.use('/signup', signupRouter);

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { layout: 'main' });
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
