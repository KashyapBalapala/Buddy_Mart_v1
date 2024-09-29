const express = require('express');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

const productsRouter = require('./routes/products/products.router');
const usersRouter = require('./routes/users/users.router');
const friendRequestRouter = require('./routes/friendRequests/friendRequests.router');
const postsRouter = require('./routes/posts/posts.router');
const bucketsRouter = require('./routes/buckets/buckets.router');
const messagesRouter = require('./routes/messages/messages.router');
const { chatRouter } = require('./routes/chats/chats.router');

require('dotenv').config();

let userData = {};

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
};

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google Profile : ', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
    done(null, id);
});


const app = express();

// app.use(helmet());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https://assets.myntassets.com", "https://images.pexels.com", "https://img.icons8.com/", "https://randomuser.me/", "https://images.unsplash.com/", "https://example.com/", "https://avatars.dicebear.com/"],
            connectSrc: ["'self'", "https://accounts.google.com"], // Allow connections to Google OAuth
            scriptSrc: ["'self'", "https://accounts.google.com", "https://cdnjs.cloudflare.com/"], // If you are using Google scripts
            // Add other directives as necessary
        },
    },
}));



app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ],
}));
app.use(passport.initialize());
app.use(passport.session());


function checkLoggedIn(req, res, next) {
    console.log('Current user is : ', req.user);
    const loggedIn = req.isAuthenticated() && req.user;
    if (!loggedIn) {
        console.log('Current user is : ', req.user);
        return res.status(401).json({
            error: 'You must login'
        })
    } 
    next();
}

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}))

// app.get('/auth/google/callback',  passport.authenticate('google', {
//     failureRedirect: '/failure',
//     successRedirect: '/',
//     session: true
// }), (req, res) => {
//     console.log('Google Called Us back');
// });

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    session: true,
}), (req, res) => {
    // Send the profile to the client-side via URL
    const userProfile = {
        id: req.user.id,
        displayName: req.user.displayName,
        emails: req.user.emails,
        photos: req.user.photos
    };
    userData = userProfile;
    // sessionStorage.setItem('user', JSON.stringify(userProfile));
    
    // Redirect to the frontend with user data
    // return res.redirect('https://localhost:8000/login-success');
    res.redirect(`https://localhost:8000/login-success?user=${encodeURIComponent(JSON.stringify(userProfile))}`);
    // return res.json({ userProfile });
});


app.get('/auth/logout', (req, res) => {
    req.logout();
    return res.redirect('/');
});

app.use(cors({
    origin: '*'
}));

app.get('/failure', (req, res) => {
    res.status(401).send('Authentication failed. Please try again.');
});


app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());

app.use('/product', productsRouter);
app.use('/users', usersRouter);
app.use('/friend', friendRequestRouter);
app.use('/posts', checkLoggedIn, postsRouter);
app.use('/bucket', bucketsRouter);
app.use('/messages', messagesRouter);
// app.use('/chat', chatRouter);

// app.use(planetsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.get('/login-success', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});


// app.get('/login-success', (req, res) => {
//     // You could either serve a static HTML file or send a JSON response
//     // For example, if you want to return the user profile as JSON:
//     console.log(req.session); // assuming you store user profile in session
//     if (userData) {
//         res.json(userData); // Send the user data as a JSON response
//     } else {
//         res.status(401).json({ message: 'User not authenticated' });
//     }
// });


module.exports = app;