/*
user signup class
*/
class Signup {
  static createNewuser(req, res) {
    const userName = req.body.username;
    // creating the new user Id.
    const newUserId = req.store.signUp.length;
    // getting user information
    const userInfo = {
      username: req.body.username,
      password: req.body.password,
      retypedPassword: req.body.retypedPassword,
    };

    // checking if username already exists
    const usernameExist = req.store.signUp.filter(user => user.username === userName);
    if (usernameExist.length !== 0) {
      return res.status(400).send({
        message: 'username already exists',
      });
    }
    // checking if the user signup passwords match
    if (req.body.password !== req.body.retypedPassword) {
      return res.status(400).send({ message: " the passwords don't match " });
    }
    req.store.signUp.push(userInfo);
    return res.status(201).send({ newUserId });
  }
}

module.exports = Signup;

