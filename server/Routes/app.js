import express from 'express';
import signUpcontroller from '../controller/SignUp-controller';
import loginController from '../controller/Login-controller';
import businesscontroller from '../controller/business-controller';
import reviewsController from '../controller/reviews-controller';

const app = express.Router();

const store = {
  businesses: [{
    business: 'businessname',
    reviews: [{ review: 'good business' }, { review2: 'great business' }],
    location: 'lagos',
    category: 'tech',
  },
  {
    business: 'businessname',
    reviews: [{ review: 'nice business' }, { review2: 'wonderful business' }],
    location: 'kano',
    category: 'fashion',
  },
  ],
  signUp: [{ username: 'email', password: 'password' }],
  LogIn: [{ username: 'name', password: 'password' }],
};

app.use((req, res, next) => {
  req.store = store;
  next();
});

app.post('/auth/signup', signUpcontroller.createNewuser);
app.post('/auth/login', loginController.userLogIn);
app.post('/businesses/', businesscontroller.createBusiness);
app.put('/businesses/:businessId', businesscontroller.updateBusiness);
app.delete('/businesses/:businessId', businesscontroller.removeBusiness);
app.get('/businesses/:businessId', businesscontroller.getSinglebusiness);
app.get('/businesses', businesscontroller.getBusinesses);
app.post('/businesses/:businessId/reviews', reviewsController.addReview);
app.get('/businesses/:businessId/reviews', reviewsController.getReviews);


module.exports = app;
