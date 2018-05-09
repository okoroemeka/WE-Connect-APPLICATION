// import models
import models from '../models/index';

// review model
const review = models.Review;

/**
 * @class {*} BusinessReview
 */
class Reviews {
  /**
     * @returns {object} addReview
     * @param {*} request
     * @param {*} response
     */
  static addReview(req, res) {
    return review
      .create({
        comment: req.body.comment,
        businessId: req.params.businessId,
      })
      .then(comment => res.status(201).json(comment))
      .catch(() => res.status(400).json({
        message: 'Review could not be created',
      }));
  }

  /**
   *@return {array} getReviews
   * @param {*} request
   * @param {*} response
   */
  static getReviews(req, res) {
    return review
      .findAll({
        where: {
          businessId: req.params.businessId,
        },
      })
      .then((reviews) => {
        if (!reviews) {
          return res.status(404).json({
            message: 'No reviews for this business',
          });
        }
        return res.status(200).send(reviews);
      })
      .catch(err => res.status(400).send(err));
  }
}
export default Reviews;

