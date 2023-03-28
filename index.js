var http = require('http')
var express = require('express')
var body = require('body-parser')
var koneksi = require('./config/database')

var app = express()
app.use(body.json())
app.use(body.urlencoded({ extended: false}))

// tampil data news
app.get('/news', function(req,res) {

    // membuat query mengambil data dari table news
    var querySql = "SELECT * FROM news ORDER BY created_at DESC"

    // memanggil variable koneksi
    koneksi.query(querySql, function(err, data, column) {

        if(err) {
            console.log(`err query sql ${err.message}`)
            return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
        }

        return res.status(200).json({success:true, data:data})
    })
})

// tambah news baru
app.post('/news/create', function(req,res) {
    var data = { ...req.body }

    var querySql = "INSERT INTO news SET ?"

    koneksi.query(querySql, data, function(err, rows, field){
        if(err) {
            console.log(`err query sql ${err.message}`)
            return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
        }

        return res.status(201).json({success:true, message: 'Data berhasil disimpan',data:data})
    })
})

app.delete('/news/:id', function(req, res){

    var newsId = req.params.id;

    // cek id
    var queryGetId = 'SELECT * FROM news WHERE id = ?'

    koneksi.query(queryGetId, newsId, function(err, row, field){
        if(err) {
            console.log(`err query sql ${err.message}`)
            return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
        }

        if(row.length <= 0) {
            return res.status(400).json({success:false, message: 'Data tidak ditemukan'})
        }

        var querySql = 'DELETE FROM news WHERE id = ?'

        koneksi.query(querySql, newsId, function(err, rows, field){
            if(err) {
                console.log(`err query sql ${err.message}`)
                return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
            }

            return res.status(200).json({success:true, message:'Data berhasil dihapus'})
        })
    })

})

app.put('/news/update/:id', function(req, res){
    var newsId = req.params.id

    var data = {...req.body}

    var queryGetId = "SELECT * FROM news WHERE id = ?"
    koneksi.query(queryGetId, newsId, function(err, row, field){
        if(err) {
            console.log(`err query sql ${err.message}`)
            return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
        }

        if(row.length <= 0) {
            return res.status(400).json({success:false, message: 'Data tidak ditemukan'})
        }

        // update data
        var queryUpdate = "UPDATE news SET ? WHERE id = ?"
        koneksi.query(queryUpdate, [data, newsId], function(err, row, field) {
            if(err) {
                console.log(`err query sql ${err.message}`)
                return res.status(500).json({success:false, message: 'Terjadi kesalahan pada server'})
            }
        })

        return res.status(200).json({success:true, message:'Data berhasil diubah', data: data})
    })
})

http://localhost:8000/news

app.listen('8000', () =>{
    console.log(`Server running at port 8000`)
})
