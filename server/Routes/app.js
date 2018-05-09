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
router.post('/auth/signup', userController.createUser);
router.post('/auth/login', userController.userLogin);
router.post('/businesses/', verifyToken, businessController.createBusiness);
router.put('/businesses/:businessId', businessController.updateBusiness);
router.delete('/businesses/:businessId', businessController.deleteBusiness);
router.get('/businesses/:businessId', businessController.getSingleBusiness);
router.get('/businesses', businessController.getBusinesses);
router.post('/businesses/:businessId/reviews', verifyBusiness, reviewsController.addReview);
router.get('/businesses/:businessId/reviews', verifyBusiness, reviewsController.getReviews);

// exporting the router
module.exports = router;
