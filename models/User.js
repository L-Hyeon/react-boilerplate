const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// 암호키인 salt의 길이 설정
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxLength: 15
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number
})

//가져온 user 데이터를 저장하기 전 비밀번호 암호화
userSchema.pre('save', function( next ){
    var user = this

    //password 필드가 변환될 때만 암호화
    //=> 다른 필드 수정 시 재암호화 되는 현상 방지
    if (user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
    
                user.password = hash
                next()
            })
        })
    }

})

// 메인 js 파일에서 사용하기 위해 export
const User = mongoose.model('User', userSchema)
module.exports = { User }
