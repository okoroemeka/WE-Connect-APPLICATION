// import models
import models from '../models/index';

// Business model
const businessModel = models.Business;

/**
 * @class {*} Businesses
 */

class Businesses {
  /**
   *@returns{ array } getBusinesses
   * @param {*} request
   * @param {*} response
   */
  static getBusinesses(req, res) {
    // Get request business by location
    if (req.query.location) {
      return businessModel
        .findAll({
          where: {
            location: req.query.location,
          },
        })
        .then((businesses) => {
          if (businesses.length === 0) {
            return res.status(404).json({
              message: 'There is no registered business within the specified location',
            });
          }
          return res.status(200).send(businesses);
        })
        .catch(() => res.status(400).json({
          message: 'Can not get business',
        }));
    }

    // Get business by category
    if (req.query.category) {
      return businessModel
        .findAll({
          where: {
            category: req.query.category,
          },
        })
        .then((businesses) => {
          if (businesses.length === 0) {
            return res.status(404).json({
              message: 'There are no registered business within this category',
            });
          }
          return res.status(200).send(businesses);
        })
        .catch(() => res.status(400).json({
          message: 'A problem occured while trying to get your business',
        }));
    }
    return businessModel
      .findAll()
      .then((businesses) => {
        if (businesses.length === 0) {
          return res.status(404).json({
            message: 'There are No business available',
          });
        }
        return res.status(200).send(businesses);
      })
      .catch(err => res.status(404).json(err));
  }

  /**
 * @return{object} createBusiness
 * @param {*} request
 * @param {*} response
 */
  static createBusiness(req, res) {
    return businessModel
      .create({
        company: req.body.company,
        address: req.body.address,
        state: req.body.state,
        telephone: req.body.telephone,
        website: req.body.website,
        location: req.body.location,
        category: req.body.category,
        userId: req.decoded.id,
      })
      .then(business => res.status(201).json({
        message: 'Business created sucessfully',
        business,
      }))
      .catch(err => res.status(400).json(err));
  }

  /**
   * @return {object} getSingleBusiness
   * @param {*} request
   * @param {*} response
   */
  static getSingleBusiness(req, res) {
    return businessModel
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'This particular business does not exist',
          });
        }
        return res.status(200).send(business);
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * @return{object} updateBusiness
   * @param {*} request
   * @param {*} response
   */
  static updateBusiness(req, res) {
    return businessModel
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'The Business you want to update does not exist',
          });
        }
        return business
          .update(req.body, { feilds: Object.keys(req.body) })
          .then(() => res.status(200).json({
            message: 'Business updated',
          }))
          .catch(() => res.status(400).json({
            message: 'There was a problem updating your business',
          }));
      })
      .catch(err => res.status(400).send(err));
  }

  /**
   * @return {object} deleteBusiness
   * @param {*} reqeust
   * @param {*} response
   */
  static deleteBusiness(req, res) {
    return businessModel
      .findById(req.params.businessId)
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'The business you want to delete does not even exist',
          });
        }
        return business
          .destroy()
          .then(() => res.status(200).json({
            message: 'Business deleted sucessfully',
          }))
          .catch(() => res.status(400).json({
            message: 'There was a problem deleting the business',
          }));
      })
      .catch(() => {
        res.status(400).json({
          message: 'There was a problem deleting this business',
        });
      });
  }
}
export default Businesses;
