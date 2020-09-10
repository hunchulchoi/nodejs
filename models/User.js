const mongoose = require('mongoose')

// 스키마를 만든다.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }    

})

// 모델과 스키마를 연결
const User = mongoose.model('User', userSchema)

// User 모델을 다른 파일에서도 쓸수 있도록 export
module.exports = { User }