export const setCookie = (cookieName) => {
  const cookieValue = "test-cookie-value";
  const date = new Date();

  date.setTime(`${date.getTime()}${30 * 24 * 60 * 60 * 1000}`);

  document.cookie = `${cookieValue}=${cookieName}; expires=${date.toUTCString()}; path=/`;

  console.log("cookies:  ", document.cookie);
};

export const getCookie = (cookieKey) => {
  let cookieName = `${cookieKey}=`;

  let cookieArray = document.cookie.split(";");

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
};
