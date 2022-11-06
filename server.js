const { request, response } = require('express')
let express = require('express')
let app = express()
let bodyParser = require('body-parser')

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

// ROUTES
app.get('/', (request, response) => {
    // response.send('bonjour')
    response.render('pages/index', {test: 'salut'})
})

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message ==='') {
        response.render('pages/index', {error: "Vous n'avez pas rentré de message"})
    }
})

app.listen(8080)