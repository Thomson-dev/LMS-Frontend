export function isTokenExpired(token) {
    if (!token) return true;
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = decodedToken.exp * 1000;
    return Date.now() > expiryTime;
  }