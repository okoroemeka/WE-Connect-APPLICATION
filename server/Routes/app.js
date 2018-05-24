// import express router  for handling user request.
import express from 'express';

// import body parser for formatting user request
import bodyParser from 'body-parser';

// import logger for returning response
import logger from 'morgan';

// import errorhandler for taking care of errors
import errorhandler from 'errorhandler';

// import all controllers
import userController from '../db-controller/usercontroller';
import businessController from '../db-controller/business-controller';
import reviewsController from '../db-controller/reviewController';

// import middlewares
import verifyToken from '../middlewares/auth';
import checkBusiness from '../middlewares/verifyBusiness';


// creating express router
const router = express();

// verify business
const verifyBusiness = checkBusiness.verifyBusiness;


router.use(bodyParser.json());
router.use(errorhandler());
router.use(logger('dev'));
router.use(bodyParser.urlencoded({ extended: true }));


// adding end points to router
router.post('/api/v1/auth/signup', userController.createUser);
router.post('/api/v1/auth/login', userController.userLogin);
router.post('/api/v1/businesses/', verifyToken, businessController.createBusiness);
router.put('/api/v1/businesses/:businessId', businessController.updateBusiness);
router.delete('/api/v1/businesses/:businessId', businessController.deleteBusiness);
router.get('/api/v1/businesses/:businessId', businessController.getSingleBusiness);
router.get('/api/v1/businesses', businessController.getBusinesses);
router.post('/api/v1/businesses/:businessId/reviews', verifyBusiness, reviewsController.addReview);
router.get('/api/v1/businesses/:businessId/reviews', verifyBusiness, reviewsController.getReviews);

// exporting the router
module.exports = router;
