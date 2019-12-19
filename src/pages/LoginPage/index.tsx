import React from "react";
import Header from "../../components/Header";
import LoginForm from "../../components/LoginForm";

export default React.memo(() => {
  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
});
