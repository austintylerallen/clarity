const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const sequelize = require('./config/database');
const politicianRoutes = require('./routes/politicianRoutes');
const authRoutes = require('./routes/authRoutes');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();

// Session configuration for Passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true } // Set to true in production with HTTPS
}));

// Initialize Passport and set it up to work with Express
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware to use for flash messages stored in session
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // Passport sets 'error'
    next();
});

// Set up Handlebars as the template engine
app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts/')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define base routes
app.get('/', (req, res) => {
    res.render('home', { layout: 'main' });
});
app.get('/about', (req, res) => {
    res.render('about', { layout: 'main' });
});

// Use the politician routes
app.use('/politicians', politicianRoutes);

// Mount auth routes with a specific prefix, assuming you have a reason (e.g., organization)
app.use('/auth', authRoutes); // This makes it accessible via /auth/login, /auth/signup, etc.

// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/dashboard');
}

// Dashboard route protected by authentication middleware
app.get('/auth/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { layout: 'main' });
});

// Define route for login page
app.get('/login', (req, res) => {
    res.render('login', { layout: 'main' });
});

// Handle login form submission
app.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/auth/dashboard',
    failureRedirect: '/login',
    failureFlash: true  // Assuming you have set up flash messages for login failures
 }));

// Error Handling Middleware
app.use((req, res, next) => {
    res.status(404).send("404: Page not found");
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
