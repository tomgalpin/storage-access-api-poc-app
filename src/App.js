import React, { useState } from "react";
import { setCookie } from "./utils";
import { S } from "./styled";

function App() {
  const [cookieName, setCookieName] = useState("");
  const [isCookiePlaced, setIsCookiePlaced] = useState();

  const onSubmitCookie = () => {
    if (cookieName && cookieName.length >= 1) {
      setCookie(cookieName);
      setIsCookiePlaced(true);
    }
  };

  return (
    <div className="App">
      <S.Page>
        <S.Container>
          <S.H1>Storage Access API POC</S.H1>
          <S.P>
            <strong>About:</strong> This POC demonstrates how different browsers
            prompt a user for Storage Access consent when a cookie is set in an
            embedded, cross-site iframe.
          </S.P>
          <S.Box>
            <S.TextInput
              type="text"
              name="cookieName"
              placeholder="Cookie Name"
              onChange={(event) => setCookieName(event.target.value)}
            />
            <S.Button onClick={onSubmitCookie} disabled={cookieName.length < 1}>
              Set Cookie in Browser
            </S.Button>
          </S.Box>
          {isCookiePlaced && (
            <S.P>
              Cookie Name set as: <span>{cookieName}</span>
            </S.P>
          )}
        </S.Container>
      </S.Page>
    </div>
  );
}

export default App;
