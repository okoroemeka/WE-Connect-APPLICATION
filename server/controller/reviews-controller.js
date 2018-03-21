/*
business reviews class
*/
class Reviews {
  static getReviews(req, res) {
    const Id = req.params.businessId;
    const business = req.store.businesses[Id];
    if (!business) {
      res.status(404).send();
    }
    res.status(200).send(business.reviews);
  }
  static addReview(req, res) {
    const customerReview = req.body;
    const allCustomerReviews = req.store.businesses[req.params.businessId].reviews;
    allCustomerReviews.push(customerReview);
    res.status(201).send(allCustomerReviews);
  }
}

module.exports = Reviews;
