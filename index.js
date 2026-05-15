const express = require('express')
const chart = require('chart.js')
const path = require('path')

const app = express()

const PORT = 3000

app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
    res.sendFile(__dirname, "index.html")
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})