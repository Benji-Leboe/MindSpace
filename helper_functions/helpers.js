


// helper functions for server

module.exports = {
  //set cookie data
  setCookie: (req, option, param) => {
    return req.session[option] = param;
  },
  //hash password
  passHasher: (password) => {
    argon2.generateSalt().then(salt => {
      argon2.hash(password, salt).then(hash => {
        console.log('Created Argon2 hash:', hash);
        return hash;
      })
    })
  },
  //compare input password to DB hash
  hashCheck: (hash, password) => {
    argon2.verify(hash, password).then(() => {
      console.log('Correct password.');
    }).catch(() => {
      console.log('Invalid password.');
    });
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
    return string.substr(1,10);
  },
  //check for http prefix
  httpCheck: (url) => {
    let check = new RegExp('http');
    return check.test(url);
  }
}