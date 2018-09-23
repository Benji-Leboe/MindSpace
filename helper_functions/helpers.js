const argon2  = require('argon2');


// helper functions for server

module.exports = {
  //set cookie data
  setCookie: (req, option, param) => {
    return req.session[option] = param;
  },
  //hash password
  passHasher: (password) => {
    return argon2.hash(password);
  },
  //compare input password to DB hash
  hashCheck: (hash, password) => {
    return argon2.verify(hash, password);
  },
  //check for min length
  isMinLength: (input, length) => {
    if (input.length > length) {
      return true;
    }
    return false;
  },
  //generate random six-letter string
  generateRandomString: () => {
    let string = "";
    for (let i = 0; i <= 10; i++) {
      string += Math.random().toString(36).substr(2, 15);
    }
    return string.substr(1,8);
  },
  //check for http prefix
  httpCheck: (url) => {
    let check = new RegExp('http');
    return check.test(url);
  }
}