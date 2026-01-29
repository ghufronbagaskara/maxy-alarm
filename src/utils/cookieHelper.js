const COOKIE_NAME = "alarms_data";
const COOKIE_EXPIRY_DAYS = 364;

export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const stringValue = JSON.stringify(value);
  document.cookie = `${name}=${encodeURIComponent(stringValue)};expires=${expires.toUTCString()};path=/`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    const c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
  }
  return null;
};

export const saveAlarmsToCookie = (alarms) => {
  setCookie(COOKIE_NAME, alarms, COOKIE_EXPIRY_DAYS);
};

export const loadAlarmsFromCookie = () => {
  const alarms = getCookie(COOKIE_NAME);
  return Array.isArray(alarms) ? alarms : [];
};

export const areCookiesAvailable = () => {
  try {
    const testKey = "__cookie_test__";
    setCookie(testKey, "test", 1);
    const result = getCookie(testKey) === "test";

    // clean up test cookie
    document.cookie = `${testKey}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    return result;
  } catch (e) {
    return false;
  }
};
