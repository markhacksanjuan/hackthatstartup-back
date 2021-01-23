require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const cors = require('cors')

// --- DATABASE CONFIGURATION ---
require('./configs/db.config')

// --- EXPRESS ---
const app = express()

// --- PORT ---
const PORT = process.env.PORT || 3000

// --- MIDDLEWARE SETUP ---
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('trust proxy', 1)
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    sameSite: 'none',
    secure: true
}))

// --- CORS MIDDLEWARE ---
app.use(cors({
    origin: ["http:localhost:3001"]
}))

// --- SESSION CONFIGURATION ----
app.use(session ({
    secret: `${process.env.DATABASE}`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))

// --- PASSPORT CONFIGURATION ---
require('./configs/passport.config')

// --- MIDDLEWARE PASSPORT ---
app.use(passport.initialize())
app.use(passport.session())

// --- ROUTES ---
const index = require('./routes/index.routes')
app.use('/', index)
const auth = require('./routes/auth.routes')
app.use('/auth', auth)
const work = require('./routes/work.routes')
app.use('/work', work)
const academic = require('./routes/academic.routes')
app.use('/academic', academic)


// --- ERROR ROUTES ---
app.use((req, res, next) => {
    res.status(404)
    res.send('not-found')
})
app.use((err, req, res, next) => {
    if(!res.headersSent) {
        res.status(500)
        res.send('error')
    }
})

// --- LISTEN ---
app.listen(PORT, () => {
    console.log('conectado')
})