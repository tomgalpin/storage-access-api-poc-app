import React, { useEffect, useState } from "react";
import { setCookie } from "./utils";
import { S } from "./styled";

function App() {
  const [cookieName, setCookieName] = useState("");
  const [isCookiePlaced, setIsCookiePlaced] = useState(false);
  const [hasCookieAccess, setHasCookieAccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const checkForStorageAccess = () => {
    document.hasStorageAccess().then(
      function (hasAccess) {
        console.log(13, hasAccess);
        setHasCookieAccess(true);
      },
      function (failureReason) {
        console.log(16, failureReason);
        setHasCookieAccess(false);
      }
    );
  };

  const onSubmitCookie = () => {
    checkForStorageAccess();

    if (cookieName && cookieName.length >= 1) {
      setCookie(cookieName);
      setIsCookiePlaced(true);
    }
  };

  useEffect(() => {
    const isCookieEnabled = navigator.cookieEnabled;

    console.log(10, isCookieEnabled);

    if (!isCookieEnabled) {
      setErrorMsg("Cookies are not enabled for this browser.");
      return;
    }
  }, []);

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
          {errorMsg && errorMsg.length > 0 && (
            <S.ErrorMsg>
              <S.P>{errorMsg}</S.P>
            </S.ErrorMsg>
          )}
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
