/*
Business controller class
*/

class Business {
  /* Gets all business from the array of business */

  static getBusinesses(req, res) {
    /* Checking if user wants to get business by locaton and
    return businesses within the user specified location */

    if (req.query.location) {
      // Getting business location
      const businessLocation = req.query.location;
      // Getting all business within the specified location
      const businessesWithinLocation = req.store.businesses
        .filter(business => business.location === businessLocation);
      // Checking if there are no business within the specified location.
      if (businessesWithinLocation.length === 0) {
        return res.sendStatus(404);
      }
      // Sending all the business within the location to the specific users
      return res.status(200).send(businessesWithinLocation);
    }
    /* Checking if user wants to get business by category
    and then return businesses within the user specified category */

    if (req.query.category) {
      // Get business category
      const businessCategory = req.query.category;
      // Get businesses within the specified category
      const businessesByCategory = req.store.businesses
        .filter(business => business.category === businessCategory);

      /* Checking if there are no business within the
      specified category,then sending response to user. */
      if (businessesByCategory.length === 0) {
        return res.sendStatus(404);
      }
      // sending response to user with businesses within the specified category
      return res.status(200).send(businessesByCategory);
    }
    // Sending all businesses to user when category nor location is specified.
    return res.status(200).send(req.store.businesses);
  }

  /* Creating new Business user */
  static createBusiness(req, res) {
    // Getting business information
    const newBusinessInformation = {
      businessName: req.body.businessName,
      businessAddress: req.body.businessAddress,
      phoneNumber: req.body.phoneNumber,
      businessWebsite: req.body.businessWebsite,
      businessCategory: req.body.businessCategory,
      businessLocation: req.body.businessLocation,
    };
    // Getting new business Id
    const businessId = req.store.businesses.length;
    // Adding new business to array of businesses
    req.store.businesses.push(newBusinessInformation);
    // Sending responds to User
    res.status(201).send({ businessId });
  }

  /* Gets a specific business from the array of businesses */
  static getSinglebusiness(req, res) {
    // Get the business Id
    const Id = req.params.businessId;
    const business = req.store.businesses[Id];
    // Checking if the does not business exist
    if (!business) {
      res.status(404).send({ message: 'businesss does not exist' });
    }
    // Sending response to the user for an already existing business
    res.status(200).send(business);
  }

  /* Updating the information of a particular business */
  static updateBusiness(req, res) {
    // Get business Id
    const Id = req.params.businessId;
    // Get business information
    const businessInformation = {
      businessName: req.body.businessName,
      businessAddress: req.body.businessAddress,
      phoneNumber: req.body.phoneNumber,
      businessWebsite: req.body.businessWebsite,
      businessCategory: req.body.businessCategory,
      businessLocation: req.body.businessLocation,
    };
    // Get new business Id
    const businessId = req.store.businesses.length;
    // Get business from business array
    const businessToUpdate = req.store.businesses[Id];
    // Checking if business does not exist and then creating it.
    if (!businessToUpdate) {
      req.store.businesses.push(businessInformation);
      res.status(201).send({ businessId });
    }
    // Updating the information of the already existing business
    req.store.businesses[Id] = businessInformation;
    res.status(200).send(req.store.businesses);
  }

  /* Removing a business */
  static removeBusiness(req, res) {
    // Get user Id
    const Id = req.params.businessId;
    // Removing the specified from the array of businesses
    req.store.businesses.splice(Id, 1);
    res.sendStatus(204);
  }
}

module.exports = Business;
