const express = require('express')
const app = express()
const port = 3000

const config = require('./config/key')


console.debug(config.mongoURI);

//mongoose 설정
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Mongodb connected.......'))
    .catch(err => console.error(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하셔요   됐다 안됐다..')
})

//  body parser 
const bodyParser = require('body-parser')

// User model 사용
const {User} = require('./models/User')

// body parser 설정

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// application/json
app.use(bodyParser.json())


//회원 가입
app.post('/register', (req, res)=>{

  console.dir(req)

  const user = new User(req.body)

  console.log(new Date(), user)

  user.save((err, userInfo)=>{
    if(err) {
        console.error(err);
        return res.json({success: false})
    }
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
