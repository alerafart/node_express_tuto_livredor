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
// ROUTES
app.get('/', (request, response) => {
    if(request.session.error){
        response.locals.error = request.session.error
        request.session.error = undefined
    }
    response.render('pages/index')
})

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message ==='') {
        request.session.error = "Il y a une erreur"
        response.redirect('/')

    }
    
})

app.listen(8080)