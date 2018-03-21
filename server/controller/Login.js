/*
user login class
*/
class LogIn {
  static userLogIn(req, res) {
    const user = req.body;
    req.store.LogIn.push(user);
    res.status(201).send(req.store.LogIn);
  }
}

module.exports = LogIn;
