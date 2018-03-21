/*
user signup class
*/
class Signup {
  static createNewuser(req, res) {
    const userInfo = req.body;
    const newUserId = req.store.signUp.length;
    req.store.signUp.push(userInfo);
    res.status(201).send({ newUserId });
  }
}

module.exports = Signup;

