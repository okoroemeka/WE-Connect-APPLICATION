/*
user signup class
*/
class Signup {
  static createNewuser(req, res) {
    // getting user information
    const userInfo = { userName: req.body.userName, password: req.body.password };
    // creating the new user Id.
    const newUserId = req.store.signUp.length - 1;
    // checking if the user signup passwords match
    if (req.body.password === req.body.retypedPassword) {
      req.store.signUp.push(userInfo);
      res.status(201).send({ newUserId });
    }
    res.status(400).send({ message: " the passwords don't match " });
  }
}

module.exports = Signup;

