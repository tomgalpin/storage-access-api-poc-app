/* eslint-disable no-script-url */
import React, { useEffect, useState } from "react";
import { setCookie } from "./utils";
import { S } from "./styled";

function App() {
  const [cookieValue, setCookieValue] = useState("");
  const [currentCookies, setCurrentCookies] = useState("");
  const [hasCookieAccess, setHasCookieAccess] = useState(false);

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

  const makeStorageAccessRequest = () => {
    document.requestStorageAccess().then(
      function () {
        console.log("storage access granted");

        console.log(31, cookieValue);

        if (cookieValue && cookieValue.length >= 1) {
          setCookie(cookieValue);
          setCurrentCookies(document.cookie);
        }
      },
      function () {
        console.log("storage access denied");

        setHasCookieAccess(false);
      }
    );
  };

  const onSubmitCookie = (event) => {
    event.preventDefault();

    checkForStorageAccess();
    makeStorageAccessRequest();

    event.target.reset();
  };

  useEffect(() => {
    const cookies = document.cookie;

    console.log("cookies onload: ", cookies);

    if (cookies.length > 0) {
      setCurrentCookies(cookies);
    }
  }, []);

  return (
    <div className="App">
      <S.Page>
        <S.Container>
          <S.H1>Storage Access API POC</S.H1>
          <S.P>
            This POC demonstrates how different browsers prompt a user for
            Storage Access consent when a cookie is set using the Storage Access
            API, in an embedded, cross-site iframe.
          </S.P>
          {currentCookies && currentCookies.length > 0 && (
            <S.CookieMsg>
              <S.P>
                <strong>Current cookies:</strong> {currentCookies}
              </S.P>
            </S.CookieMsg>
          )}
          <S.Form action="" onSubmit={(event) => onSubmitCookie(event)}>
            <S.TextInput
              type="text"
              name="cookieName"
              value={cookieValue}
              placeholder="Cookie Name"
              onChange={(event) => setCookieValue(event.target.value)}
            />
            <S.Button
              type="submit"
              disabled={!hasCookieAccess && cookieValue.length < 1}
            >
              Set Cookie in Browser
            </S.Button>
          </S.Form>
        </S.Container>
      </S.Page>
    </div>
  );
}

export default App;
