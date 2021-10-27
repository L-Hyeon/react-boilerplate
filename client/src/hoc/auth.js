import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function (SpecificCompoenet, option, adminRoute = null) {
  //option
  //null = 아무나 출입 가능
  //true - 로그인 유저만
  //fase = 로그인 유저 제외

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          }
          if (!option) {
            props.history.push("/");
          }
        }
      });
    }, []);

    return <SpecificCompoenet />;
  }

  return AuthenticationCheck;
}
