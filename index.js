/* ----------------------------- IMPORTS -------------------------------------*/
const express = require('express')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')   // templating engine: use ejs as engine; any file ending in ejs should be rendered with the EJS package
app.use(express.static('public'))

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ClarissaIssy:%2365Hibiscus@blogsite.qonask5.mongodb.net/', {useNewUrlParser: true})

// body-parser parses body of requests
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// express file-upload
const fileUpload = require('express-fileupload')
app.use(fileUpload())

// express sessions
const expressSession = require('express-session')
app.use(expressSession({
    secret: 'keyboard cat'  // used to sign and encrypt the session ID cookie
}))

// enables flushing errors from session
const flash = require('connect-flash')
app.use(flash())

// custom middleware
const validateMiddleware = require("./middleware/validationMiddleware")
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

/* --------------------------- END IMPORTS -----------------------------------*/
global.loggedIn = null; // accessible from all EJS files

app.use("*", (req, res, next) =>{   // * signifies that, on all requests, this middleware should be executed
    loggedIn = req.session.userId;
    next()
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port, ()=>{
    console.log("App listening on port 4000")
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)

app.post('/posts/store', authMiddleware, storePostController)   // handle new blog post creations
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.use((req, res) => res.render('notfound'));