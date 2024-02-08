import { styled } from "styled-components";

export const S = {
  Page: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #faf0e6;
    min-height: 100vh;
    text-align: center;
  `,
  Container: styled.div`
    width: 60%;
    padding: 20px 20px 50px 20px;
    margin-bottom: 20px;
  `,
  H1: styled.h1`
    color: #000;
  `,
  P: styled.p`
    color: #000;
    font-size: 16px;
    line-height: 25px;
  `,
  CookieMsg: styled.div`
    width: 80%;
    padding: 5px 10px 8px 5px;
    background: #42b883;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto 20px auto;

    p {
      font-size: 12px;
      margin: 5px;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
  `,
  TextInput: styled.input`
    padding: 15px 20px 15px 20px;
    margin-bottom: 20px;
  `,
  Button: styled.button`
    background-color: #008cba;
    padding: 20px 20px 25px 20px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border: none;
    border-radius: 5px;

    &: hover {
      background-color: #97d0e3;
    }

    &: disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
  `,
};
