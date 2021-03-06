const mongoose = require('mongoose')

// 비밀번호 암호화를 위한 bcrypt
const bcrypt = require('bcrypt')

const saltRounds = 10

// jwt
const jwt = require('jsonwebtoken')

// 스키마를 만든다.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: Number,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// password 체크
userSchema.methods.comparePassword = async function (password) {
  console.debug('userSchema.methods.comparePassword:', password, this.password, this)

  const same = await bcrypt.compare(password, this.password)

  const user = this

  console.debug(`same:${same}`)
  return new Promise((resolve, reject) => {
    console.debug(`return new Promise():${same}, ${this}, ${user}`)
    //console.dir(this)

    if (same) resolve(user)
    else reject('로그인 정보가 정확하지 않습니다.')
  })
}

// token 생성
userSchema.methods.generateToken = function () {
  let user = this

  user.token = jwt.sign(user._id.toHexString(), 'secretToken')
  return user.save()
}

//password 필드 암호화
userSchema.pre('save', function (next) {
  const user = this

  //비밀번호가 변경 되었을때만
  console.debug(`user.isModified('password'):${user.isModified('password')}`)

  if (user.isModified('password')) {
    // 2. salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)

      // 3. salt를 이용해서 암호화
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)

        user.password = hash

        console.debug(`user:${user}`)

        // save 메소드 호출
        next()
      })
    })
  } else {
    // save 메소드 호출
    next()
  }
})

// 모델과 스키마를 연결
const User = mongoose.model('User', userSchema)

// User 모델을 다른 파일에서도 쓸수 있도록 export
module.exports = { User }
