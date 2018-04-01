/*
user login class
*/
class LogIn {
  static userLogIn(req, res) {
    // getting user login information
    const userinfo = { userName: req.body.userName, password: req.body.password };
    // putting user information into login array
    req.store.LogIn.push(userinfo);

    res.status(200).send({ message: 'Welcome' });
  }
}

module.exports = LogIn;

