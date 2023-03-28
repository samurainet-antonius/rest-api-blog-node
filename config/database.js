var mysql = require('mysql')

const koneksi = mysql.createConnection({
    host:'srv54.niagahoster.com',
    user:'u6411026_client',
    password: 'db@client123',
    database: 'u6411026_laravel-blog',
    multipleStatements: true
})

koneksi.connect((err) => {
    if(err) {
        console.log(`Error koneksi : ${err.message}`)
    }

    console.log(`Koneksi sukses`)
})

module.exports = koneksi