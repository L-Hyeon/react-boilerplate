const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 암호키인 salt의 길이 설정
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: String,
  tokenExp: Number,
});

//가져온 user 데이터를 저장하기 전 비밀번호 암호화
userSchema.pre("save", function (next) {
  var user = this;

  //password 필드가 변환될 때만 암호화
  //=> 다른 필드 수정 시 재암호화 되는 현상 방지
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// DB의 비밀번호와 로그인 시 넘겨 받은 비밀번호 비교
userSchema.methods.comparePassword = function (planePassword, cb) {
  // DB에 저장된 비밀번호는 복호화 불가능
  // planePassword를 암호화해서 비교

  bcrypt.compare(planePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 웹 토큰 생성
userSchema.methods.generateToken = function (cb) {
  var user = this;
  //ID와 secretToken이라는 임의 문자열을 더해 토큰 생성
  //이후 넣은 임의 문자열을 가지고 토큰 해석 가능
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// 토큰을 기준으로 현재 접속중인 유저 찾기
userSchema.methods.findByToken = function (token, cb) {
  var user = this;
  //1. 토큰 디코드
  jwt.verify(token, "secretToken", function (err, deoded) {
    //ID를 통해 유저 찾기
    //클라이언트 토큰, DB에 보관된 토큰 일치 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// 메인 js 파일에서 사용하기 위해 export
const User = mongoose.model("User", userSchema);
module.exports = { User };
