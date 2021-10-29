import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

  //useState를 남발하지 않고 하나의 객체로 값들 관리하기
  const [Inputs, setInputs] = useState({
    Email: "",
    Password: "",
  });
  // 로그인 실패 시 이메일 입력창을 선택하기 위해 설정
  // useRef는 특정 DOM을 선택하기 위해 사용
  const emailInput = useRef();

  const { Email, Password } = Inputs;

  const onInputHander = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };

  // input태그에 타이핑을 할 때 onChange 이벤트 발생
  // 변경된 값이 ID, Password State에 저장됨
  /*const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };*/

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
        //에러 발생 시 이메일 입력 창에 포커스 설정
        emailInput.current.focus();
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          name="Email"
          value={Email}
          onChange={onInputHander}
          ref={emailInput}
        />

        <label>Password</label>
        <input
          type="password"
          name="Password"
          value={Password}
          onChange={onInputHander}
        />

        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
