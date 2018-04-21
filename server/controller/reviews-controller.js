/*
* business reviews class
*/
class Reviews {
  // Getting the reviews of business
  static getReviews(req, res) {
    const Id = req.params.businessId;
    const business = req.store.businesses[Id];
    if (!business) {
      return res.status(404).send({
        message: 'Business not found',
      });
    }
    if (business.reviews.length === 0) {
      return res.status(404).send({
        message: 'There are no reviews for this business',
      });
    }
    return res.status(200).send(business.reviews);
  }

  // Addding review to business
  static addReview(req, res) {
    const customerReview = req.body;
    const businessToReview = req.store.businesses[req.params.businessId];
    if (!businessToReview) {
      return res.status(404).send({
        message: 'Business not found',
      });
    }

    businessToReview.reviews.push(customerReview);
    return res.status(201).send({ message: 'comment created' });
  }
}

module.exports = Reviews;
