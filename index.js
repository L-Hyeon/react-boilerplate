const port = 3000

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require("./models/User")
const config = require('./config/key')

//application/x-www-form-urlencoded 를 파싱
app.use(bodyParser.urlencoded({ extended: true }))
//application/json 을 파싱
app.use(bodyParser.json())

//몽구스를 사용해서 몽고DB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('connected')).catch((err) => console.log('error'))

app.get('/', (req, res) => {
  res.send('Checking NodeMon...')
})

//Route for Register
app.post('/register', (req, res) => {
  //가입에 필요한 정보를 client에서 가져오면
  //DB에 데이터를 넣음

  //바디 파서를 통해 리퀘스트의 바디를 파싱, user에 저장
  const user = new User(req.body)
  //가져온 유저 데이터 저장
  user.save((err, doc) => {
    //에러 발생 시 json형태로 err 반환
    if (err) return res.json({ success: false, err })
    // 성공 시 http 200 코드와 success True를 가지는 json 반환
    return res.status(200).json({
      success: true
    })
  })
})

//Route for Log-In
app.post('/login', (req, res) => {
  //1. 요청된 이메일이 DB에 있는 지 확인
  //2. 이메일이 있으면 비밀번호 맞는 지 확인
  //3. 비밀번호가 맞으면 토큰을 생성

  // 몽고DB에서 제공하는 findOne함수를 이용해 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입된 이메일인지 확인해주세요"
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다" })

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        //토큰은 쿠키, 로컬 등 다양한 위치에 저장 가능
        //현 강의에서는 쿠키에 x_auth라는 이름으로 저장
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userID: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
