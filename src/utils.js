export const setCookie = (cookieValue) => {
  const cookieName = "test-cookie-value";
  const date = new Date();

  console.log(5, cookieName);
  console.log(6, cookieValue);
  console.log(7, date.toUTCString());
  console.log(
    8,
    `${cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/`
  );

  date.setTime(`${date.getTime()}${30 * 24 * 60 * 60 * 1000}`);

  document.cookie = `${cookieName}=${cookieValue}; expires=${date.toUTCString()}; path=/`;

  console.log("cookies:  ", document.cookie);
};

export const getCookie = () => {
  const cookieName = "test-cookie-value";
  let cookieKey = `${cookieName}=`;

  let cookieArray = document.cookie.split(";");

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(cookieKey) === 0) {
      return cookie.substring(cookieKey.length, cookie.length);
    }
  }
};
