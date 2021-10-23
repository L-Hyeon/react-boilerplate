const port = 5000;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const requestIP = require("request-ip");

const { User } = require("./models/User");
const { auth } = require("./middleware/auth");
const config = require("./config/key");

//application/x-www-form-urlencoded 를 파싱
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 을 파싱
app.use(bodyParser.json());
//쿠피 파서를 통해 쿠키 저장
app.use(cookieParser());

//몽구스를 사용해서 몽고DB 연결
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("connected"))
  .catch((err) => console.log("error"));

app.get("/", (req, res) => {
  res.send("Checking NodeMon...");
});

//Register Route
app.post("/api/users/register", (req, res) => {
  //가입에 필요한 정보를 client에서 가져오면
  //DB에 데이터를 넣음

  //바디 파서를 통해 리퀘스트의 바디를 파싱, user에 저장
  const user = new User(req.body);
  //가져온 유저 데이터 저장
  user.save((err, doc) => {
    //에러 발생 시 json형태로 err 반환
    if (err) return res.json({ success: false, err });
    // 성공 시 http 200 코드와 success True를 가지는 json 반환
    return res.status(200).json({
      success: true,
    });
  });
});

//Log-In Route
app.post("/api/users/login", (req, res) => {
  //1. 요청된 이메일이 DB에 있는 지 확인
  //2. 이메일이 있으면 비밀번호 맞는 지 확인
  //3. 비밀번호가 맞으면 토큰을 생성

  // 몽고DB에서 제공하는 findOne함수를 이용해 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입된 이메일인지 확인해주세요",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다",
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰은 쿠키, 로컬 등 다양한 위치에 저장 가능
        //현 강의에서는 쿠키에 x_auth라는 이름으로 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userID: user._id });
      });
    });
  });
});

// Authentication Route
app.get("/api/users/auth", auth, (req, res) => {
  //미들웨어에서 토큰 검증 완료
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

// Log-Out Route
app.get("/api/users/logout", auth, (req, res) => {
  //DB에서 로그아웃하려는 유저 찾기
  //유저 토큰 DB에서 삭제

  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.get("/api/hello", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
