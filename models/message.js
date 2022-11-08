let connection = require('../config/db')
 


class Message {
    static create (content, cb) {
        connection.query('INSERT INTO messages Set content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }
}

module.exports = Message
