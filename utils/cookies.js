import Cookies from 'js-cookie';

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key); // Type string || Undefined

  // If it is undefined then i´m just gonna return undefined
  if (!cookieValue) {
    return undefined;
  }

  // If it not undefined then i´m gonna try to parse
  try {
    return JSON.parse(cookieValue); // Type should be a string
  } catch (err) {
    return undefined;
  }
}

// Now we have our util function to get our cookies

export function setStringifiedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}
