const { request, response } = require('express')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
var session = require('express-session')
// app.use(express.json()) // for parsing application/json

// Moteur de template
app.set('view engine', 'ejs')
//ejs est un moteur de model ou template
// on rajoute cette ligne apres l avoir installe avec npm --save ejs

// MIDDLEWARE  
app.use('/assets', express.static('public'))

// after npm install body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'er',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.use(require('./middlewares/flash'))

// ROUTES

app.get('/', (request, response) => {
    // console.log(request.session)
    console.log(process.env.NODE_ENV)
    let Message = require('./models/message')
    Message.all(function (messages) {
        response.render('pages/index', {messages: messages})
    })
    
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message ==='') {
        request.flash('error', "vous n'avez pas posté de message")
        response.redirect('/')

    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, function () {
            request.flash('success', "Merci")
            response.redirect('/')
        })
    }
    
})

app.get('/message/:id', (request, response) => {
    // request.params.id
    let Message = require('./models/message')
    Message.find(request.params.id, function (message) {
        response.render('messages/show', {message:message})
    })
})

app.listen(8080)