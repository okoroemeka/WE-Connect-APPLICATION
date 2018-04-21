/*
user login class
*/
class LogIn {
  static userLogIn(req, res) {
    // getting user login information
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
    };
    // checking if the user is an already existing user
    const userExist = req.store.LogIn
      .filter(user => user.username === userInfo.username && user.password === userInfo.password);
    // putting user information into login array
    if (userExist.length === 0) {
      return res.status(401).send({
        message: 'Wrong username or password',
      });
    }
    req.store.LogIn.push(userInfo);
    return res.status(200).send({ message: 'Welcome' });
  }
}

module.exports = LogIn;

