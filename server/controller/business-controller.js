/*
business controller class
*/

class Business {
  static getBusinesses(req, res) {
    if (req.query.location) {
      const businessLocation = req.query.location;
      const businessesWithinLocation = req.store.businesses.filter(business => business.location === businessLocation);
      if (businessesWithinLocation.length === 0) {
        return res.sendStatus(404);
      }
      return res.status(200).send(businessesWithinLocation);
    }

    if (req.query.category) {
      const businessCategory = req.query.category;
      const businessesByCategory = req.store.businesses.filter(business => business.category === businessCategory);
      if (businessesByCategory.length === 0) {
        return res.sendStatus(404);
      }
      return res.status(200).send(businessesByCategory);
    }
    return res.status(200).send(req.store.businesses);
  }

  static createBusiness(req, res) {
    const newBusiness = req.body;
    const businessId = req.store.businesses.length;
    req.store.businesses.push(newBusiness);
    res.status(201).send({ businessId });
  }

  static getSinglebusiness(req, res) {
    const Id = req.params.businessId;
    const business = req.store.businesses[Id];
    if (!business) {
      res.status(404).send({ message: 'businesss does not exist' });
    }
    res.status(200).send(business);
  }

  static updateBusiness(req, res) {
    const Id = req.params.businessId;
    const businessInfo = req.body;
    const businessId = req.store.businesses.length;
    const businessToUpdate = req.store.businesses[Id];

    if (!businessToUpdate) {
      req.store.businesses.push(businessInfo);
      res.status(201).send({ businessId });
    }

    req.store.businesses[Id] = businessInfo;
    res.status(200).send(req.store.businesses);
  }

  static removeBusiness(req, res) {
    const Id = req.params.businessId;
    const businessToRemove = req.store.businesses[Id];

    if (!businessToRemove) {
      res.status(404).send({ message: 'business does not exist' });
    }
    req.store.businesses.splice(Id, 1);
    res.sendStatus(204);
  }

}

module.exports = Business;
