const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { User } = require("./models/User")

//application/x-www-form-urlencoded 를 파싱
app.use(bodyParser.urlencoded({extended: true}))
//application/json 을 파싱
app.use(bodyParser.json())

//몽구스를 사용해서 몽고DB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://LHyun:c7Bb3hZKdv3MiRVU@boilerplate.p91ny.mongodb.net/Boilerplate?retryWrites=true&w=majority', {
}).then(() => console.log('connected')).catch((err) => console.log('error'))

app.get('/', (req, res) => {
  res.send('Hello World!')
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
    if (err) return res.json({ success: false, err})
    // 성공 시 http 200 코드와 success True를 가지는 json 반환
    return res.status(200).json({
      success: true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
