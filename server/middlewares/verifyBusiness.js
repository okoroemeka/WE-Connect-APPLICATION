// import models
import models from '../models/index';

// initializing business model
const business = models.Business;

/**
 *@class{*}CheckBusiness
 */
class CheckBusiness {
  /**
   * @returns {object} description
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  static verifyBusiness(req, res, next) {
    return business
      .findById(req.params.businessId)
      .then((existingBusiness) => {
        if (!existingBusiness) {
          return res.status(404).json({
            message: 'Business does not exist',
          });
        }
        return next();
      })
      .catch(() => res.status(500).json({
        message: 'your request can not be completed',
      }));
  }
}

export default CheckBusiness;
