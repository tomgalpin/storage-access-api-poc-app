/* eslint-disable no-script-url */
import React, { useCallback, useEffect, useState } from "react";
import { setCookie } from "./utils";
import { S } from "./styled";

function App() {
  const [cookieValue, setCookieValue] = useState("");
  const [currentCookies, setCurrentCookies] = useState("");
  const [hasCookieAccess, setHasCookieAccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmitCookie = async (event) => {
    event.preventDefault();

    handleCookieAccess();

    if (hasCookieAccess) {
      setCookie(cookieValue);
      setCurrentCookies(document.cookie);
    } else {
      // Check for Cookie Permissions again
      // in case something changed since last check
      // const hasCookieAccessUpdated = await handleCookieAccess();

      // if (hasCookieAccessUpdated === "prompt") {
      // Need to call requestStorageAccess() after a user interaction
      try {
        await document.requestStorageAccess();

        setCookie(cookieValue);
        setCurrentCookies(document.cookie);

        // clear out cookie value to disable submit btn
        setCookieValue("");
      } catch (err) {
        // If there is an error obtaining storage access.
        console.error(`Error obtaining storage access: ${err}.`);
        setHasCookieAccess(false);
      }
      // }
    }

    // Clear out the input:
    event.target.reset();
  };

  const handleCookieAccess = useCallback(async () => {
    // Adapted from:  https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API/Using

    console.log(
      "browser: hasStorageAccess: ",
      document.hasStorageAccess ? true : false
    );
    console.log("browser: cookieEnabled: ", navigator.cookieEnabled);

    if (!document.hasStorageAccess) {
      // This browser doesn't support the Storage Access API
      setHasCookieAccess(false);
      setHasError(true);
    } else {
      setHasError(false);

      const hasStorageAccess = await document.hasStorageAccess();

      if (hasStorageAccess) {
        // We have access to third-party cookies,
        // setCookie(cookieValue);
        setHasCookieAccess(true);
      } else {
        // Check whether third-party cookie access has been granted
        // to another same-site embed
        try {
          const permission = await navigator.permissions.query({
            name: "storage-access",
          });

          console.log("Permission query state: ", permission.state);

          if (permission.state === "granted") {
            // If so, you can just call requestStorageAccess() without a user interaction,
            // and it will resolve automatically.
            await document.requestStorageAccess();

            // setCookie(cookieValue);
            setHasCookieAccess(true);
          } else if (permission.state === "denied") {
            // User has denied third-party cookie access, so we'll
            // need to do something else
            console.log("Storage Access permission denied");

            setHasCookieAccess(false);
            setHasError(true);
          }
        } catch (error) {
          console.log("Storage Access query not available.");

          setHasCookieAccess(false);
          setHasError(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    const cookies = document.cookie;

    // Check for cookie access onload:
    handleCookieAccess();

    console.log("cookies onload: ", cookies);

    // Show cookies onload:
    if (cookies.length > 0) {
      setCurrentCookies(cookies);
    }
  }, [handleCookieAccess]);

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
          {hasError && (
            <S.ErrorMsg>
              <S.P>
                Your browser disabled cookies or will require your permission to
                set.
              </S.P>
            </S.ErrorMsg>
          )}
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
