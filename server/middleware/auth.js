const { User } = require("../models/User");
// 인증 처리 담당
let auth = (req, res, next) => {
  // 크라이언트 쿠키에서 토큰을 가져 옴
  // 토큰을 복호화한 후 유저를 찾음
  // 유저가 있으면 인증
  // 없으면 거절

  let token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //추후 정보 이용을 위해 req에 넣어줌
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
