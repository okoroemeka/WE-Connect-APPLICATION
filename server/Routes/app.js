// importing express router  for handling user request.
import express from 'express';

// impoerting body parser for formatting user request
import bodyParser from 'body-parser';

// import logger for returning response
import logger from 'morgan';

// importing errorhandler taking of errors
import errorhandler from 'errorhandler';

// importing all controllers
import signUpcontroller from '../controller/SignUp-controller';
import loginController from '../controller/Login-controller';
import businesscontroller from '../controller/business-controller';
import reviewsController from '../controller/reviews-controller';
import store from '../seeder/seed';

// creating express router
const router = express();


router.use(bodyParser.json());
router.use(errorhandler());
router.use(logger('dev'));
router.use(bodyParser.urlencoded({ extended: true }));


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
