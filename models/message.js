let connection = require('../config/db')
let datefns = require('date-fns')
let format = require('date-fns/format')
// const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
// format(date, format, [options])

class Message {

    //dates
    constructor (row) {
        this.row = row
    }

    get content () {
        return this.row.content
    }

    get created_at () {
        let date = (this.row.created_at)
        console.log(this.row.created_at)
        return format(date, "MM/dd/yyyy 'at' H:mm")
         
        // return this.row.created_at 
    }

    static create (content, cb) {
        connection.query('INSERT INTO messages Set content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if(err) throw err
            cb(result)
        })
    }

    // static all (cb) {
    //     connection.query('SELECT * FROM messages', (err, rows) => {
    //         if(err) throw err
    //         cb(rows)
    //     })
    // }

    static all (cb) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if(err) throw err
            cb(rows.map((row) => new Message(row)))
        })
    }
}


module.exports = Message
