// importing express router  for handling user request.
import express from 'express';

// impoerting body parser for formatting user request
import bodyParser from 'body-parser';

// import logger for returning responser
import logger from 'morgan';

// importing errorhandler taking of errors
import errorhandler from 'errorhandler';

// importing all controllers
import signUpcontroller from '../controller/SignUp-controller';
import loginController from '../controller/Login-controller';
import businesscontroller from '../controller/business-controller';
import reviewsController from '../controller/reviews-controller';

// creating express subrouter
const router = express();

router.use(bodyParser.json());
router.use(errorhandler());
router.use(logger('dev'));

// seed datas for testing of routes
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

// making the seed datas available to controllers
router.use((req, res, next) => {
  req.store = store;
  next();
});

// adding end points to router
router.post('/auth/signup', signUpcontroller.createNewuser);
router.post('/auth/login', loginController.userLogIn);
router.post('/businesses/', businesscontroller.createBusiness);
router.put('/businesses/:businessId', businesscontroller.updateBusiness);
router.delete('/businesses/:businessId', businesscontroller.removeBusiness);
router.get('/businesses/:businessId', businesscontroller.getSinglebusiness);
router.get('/businesses', businesscontroller.getBusinesses);
router.post('/businesses/:businessId/reviews', reviewsController.addReview);
router.get('/businesses/:businessId/reviews', reviewsController.getReviews);

// exporting the router
module.exports = router;
