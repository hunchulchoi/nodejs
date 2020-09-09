const express = require('express')
const app = express()
const port = 3000

//mongoose 설정
const mongoose = require('mongoose')
mongoose.connect('mongodb://choi:!Kimmun5032@nettlica.duckdns.org:57017', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongodb connected.......'))
    .catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
