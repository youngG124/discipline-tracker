const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('쮜이이...');
})

app.get('/1', (req, res) => {
    res.send('듀...');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})