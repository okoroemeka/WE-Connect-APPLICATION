import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/server';

import {models} from 'server/models';

import {businessSeedData} from 'server/seeders/business';
import {reviewsSeedData} from 'server/seeders/reviews';
import {userSeedData} from 'server/seeders/users'


const {expect,assert,should} = chai;
chai.use(chaiHttp);

/**
  *Test for WE-Connect Rout handlers
  *functions and middlewares.
 */
describe('Clearing the database', () =>{
  before(()=>{
    user
  })
})
describe('businesses', () => {
  // test for user signup
  describe('/POST signup', () => {
    it('should create a new user', (done) => {
      const newUser = {
        username: 'mee',
        password: 'password',

      };
      chai.request(server)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          done();
        });
    });

    // Test for checking if a user name already exists
    it('should check if new user username already exist', (done) => {
      const newUser = {
        username: 'emeka',
        password: 'password',
      };
      chai.request(server)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user already exist');
          done();
        });
    });

    // Test to check if passwords match
    it('should check if new user password match', (done) => {
      const newUser = {
        username: 'mark',
        password: 'xxxxx',
        retypedPassword: 'xxxx',
      };
      chai.request(server)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(' Please retype your password ');
          done();
        });
    });
  });

  // Test for user login
  describe('/POST userlogin', () => {
    it('should login in an already existing user', (done) => {
      const user = {
        username: 'emeka',
        password: 'password',
      };
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Login successful');
          done();
        });
    });

    // Test checking user credentials befor login
    it('should not login a user with wrong credentials ', (done) => {
      const user = {
        username: 'mark',
        password: 'password',
      };
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Sorry you dont have access to this resources');
          done();
        });
    });
  });

  // Test for creating a business
  describe('/POST businesses', () => {
  it('should create new business', (done) => {
    const business = {
      company: 'Fashion House',
      category: 'Fahion',
      address: '2 olu dara street',
      state: 'Lagos',
      telephone: '0806432xxxx',
      country: 'Nigeria',
      website: 'www.Fhouse.com',
    };
    chai.request(server)
      .post('/businesses')
      .send(business)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('object');
        res.body.should.have.property('businessId').eql(2);
        done();
      });
  });
  });

  // Test for updating a business
  describe('PUT /businesses/:businessId', () => {
    it('should update an already existing business', (done) => {
      const business = {
        company: 'Fashion House',
        category: 'Fahion',
        address: '2 olu dara street',
        state: 'Lagos',
        telephone: '0806432xxxx',
        country: 'Russia',
        website: 'www.Fhouse.com',
      };
      chai.request(server)
        .put('/businesses/4')
        .send(business)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Business updated');
          done();
        });
    });

    // Test to check if a business exists before updating it
    it('should check if a business exist', (done) => {
      const business = {
        company: 'Fashion House',
        category: 'Fahion',
        address: '2 olu dara street',
        state: 'Lagos',
        telephone: '0806432xxxx',
        country: 'Nigeria',
        website: 'www.Fhouse.com',
      };
      chai.request(server)
        .put('/businesses/0')
        .send(business)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('The Business you want to update does not exist');
          done();
        });
    });
  });

  // test for getting a single business
  describe('/GET businesses/:businessId', () => {
    it('should get a particular business', (done) => {
      chai.request(server)
        .get('/businesses/4')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('company');
          res.body.should.have.property('category');
          res.body.should.have.property('address');
          res.body.should.have.property('state');
          res.body.should.have.property('telephone');
          res.body.should.have.property('location');
          res.body.should.have.property('website');
          done();
        });
    });
  });

  // Test for get all business
  describe('/GET/business/', () => {
    it('should return all business', (done) => {
      chai.request(server)
        .get('/businesses')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.be.an('array');
          done();
        });
    });

    // Test for get businesses by location
    it('should return business by location', (done) => {
      chai.request(server)
        .get('/businesses?location=Nigeria')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

    // Test for Get business by category
    it('should return business by category', (done) => {
      chai.request(server)
        .get('/businesses?category=fashion')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

    // Test for Get/Business by location which are not available
    it('should return error for location that do not exist', (done) => {
      chai.request(server)
        .get('/businesses?location=France')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('There is no registered business within the specified location');
          done();
        });
    });

    // Test for Get/Business by category that do not exist
    it('should return error for category that do not exist', (done) => {
      chai.request(server)
        .get('/businesses?category=media')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('There are no registered business within this category');
          done();
        });
    });
  });

  // Test for creating a business review
  describe('POST/Business/:businessId/reviews', () => {
    it('should create a review for an existing business', (done) => {
      const review = {
        comment: 'good business',
      };
      chai.request(server)
        .post('/businesses/4/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('comment').eql(review.comment);
          done();
        });
    });

    // Test for Not creating a review for business that does not exist
    it('should return error for a business that does not exist for it to be reviewed', (done) => {
      const review = {
        message: 'great customer experience',
      };
      chai.request(server)
        .post('/businesses/5/reviews')
        .send(review)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('Business does not exist');
          done();
        });
    });
  });

  // Test for Getting business reviews
  describe('GET/businesses/:businessId/reviews', () => {
    it('should return reviews on a perticular business', (done) => {
      chai.request(server)
        .get('/businesses/4/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });

    // Test for trying to get reviews of a non existing business
    it('should return error message', (done) => {
      chai.request(server)
        .get('/businesses/6/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Business does not exist');
          done();
        });
    });
  });

  // Test for deleting a particular business
  describe('/DELETE /businesses/:businessId', () => {
    it('should delete a certain business', (done) => {
      chai.request(server)
        .delete('/businesses/4')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

