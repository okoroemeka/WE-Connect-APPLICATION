/*
user login class
*/
class LogIn {
  static userLogIn(req, res) {
    const user = req.body;
    req.store.LogIn.push(user);
    res.status(200).send({ message: 'Welcome' });
  }
}

module.exports = LogIn;

