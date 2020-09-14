const express = require('express')
const app = express()
const port = 3000

const config = require('./config/key')

const cookieParser = require('cookie-parser')

// console.debug(config.mongoURI)

//mongoose 설정
const mongoose = require('mongoose')
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Mongodb connected.......'))
  .catch(err => console.error(err))

//  body parser
const bodyParser = require('body-parser')

// User model 사용
const { User } = require('./models/User')

// body parser 설정

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json
app.use(bodyParser.json())

// cookie parser 설정
app.use(cookieParser())

// main
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//회원 가입
app.post('/register', (req, res) => {
  //console.dir(req)

  const user = new User(req.body)

  console.debug(new Date(), user)

  user.save((err, userInfo) => {
    if (err) {
      console.error(err)
      return res.json({ success: false })
    }
    return res.status(200).json({
      success: true,
    })
  })
})

// 로그인
app.post('/login', (req, res) => {
  // 1. 이메일 찾기
  User.findOne({ email: req.body.email })
    // 2. 비밀번호 확인
    .then(user => {
      console.debug(user)
      user.comparePassword(req.body.password)
    })
    // 3. 토큰 생성
    .then(user => {
      console.debug(`user:${user}`)
      console.dir(user)
      user.generateToken()
    })
    // 4. 토큰 저장
    .then(user => res.cookie('x_auth', user.token))
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log(`boilerplate app listening at http://localhost:${port}`)
})
