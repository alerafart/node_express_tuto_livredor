// por gerer message flash d erreur

// methode q initialise dans la session une cle flash q contiens l'errerur

// tous les middlewares et bodyparser compris analysent ce qui rentre et peuvent modifier l'objet au besoin

module.exports = function (request, response, next) {

    if(request.session.flash) {
        response.locals.flash = request.session.flash
        request.session.flash = undefined
    }


    request.flash = function (type, content) {
        
        if(request.session.flash === undefined) {
            request.session.flash = {}
        }
        request.session.flash[type] = content
    }

    next()
  }

  