// Setting the environment to test.
process.env.NODE_ENV = 'test';

// importing chai ,chaiHttp, and application server
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


const should = chai.should();

// test for get "get/business".
chai.use(chaiHttp);
describe('businesses', () => {
  describe('/GET business', () => {
    it('it return all business available', (done) => {
      chai.request(server)
        .get('/businesses')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // test for user signup
  describe('/POST signup', () => {
    it('it should create a new user', (done) => {
      const newUser = {
        name: 'emeka',
        password: 'xxxx',
      };
      chai.request(server)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // Test for user login
  describe('/POST userlogin', () => {
    it('should login in an already existing user', (done) => {
      const user = {
        name: 'emeka',
        password: 'xxxx',
      };
      chai.request(server)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Welcome');
          done();
        });
    });
  });

  // Test for creating a business
  describe('/POST businesses', () => {
    it('should create new business', (done) => {
      const business = {
        Business: 'Fashion House',
        Category: 'Fahion',
        Address: '2 olu dara street',
        State: 'Lagos',
        Telephone: '0806432xxxx',
        country: 'Nigeria',
        Website: 'www.Fhouse.com',
      };
      chai.request(server)
        .post('/businesses')
        .send(business)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('businessId').eql(2);
          done();
        });
    });
  });

  // Test for updating a business
  describe('PUT /businesses/:businessId', () => {
    it('should update an already existing business', (done) => {
      const business = {
        Business: 'Fashion House',
        Category: 'Fahion',
        Address: '2 olu dara street',
        State: 'Lagos',
        Telephone: '0806432xxxx',
        country: 'Nigeria',
        Website: 'www.Fhouse.com',
      };
      chai.request(server)
        .put('/businesses/3')
        .send(business)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('businessId').eql(3);
          done();
        });
    });
  });

  // test for getting a single business
  describe('/GET businesses/:businessId', () => {
    it('should get a particular business', (done) => {
      chai.request(server)
        .get('/businesses/0')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  // test for posting reviews
  describe('/POST /businesses/:businessId/reviews', () => {
    it('should post reviews to a certain business', (done) => {
      const comment = {
        review: 'not so wonderful, but good for a start',
      };
      chai.request(server)
        .post('/businesses/1/reviews')
        .send(comment)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Test for deleting a particular business
  describe('/DELETING /businesses/:businessId', () => {
    it('should delete a certain business', (done) => {
      chai.request(server)
        .delete('/businesses/0')
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });

  // Test for get reviews on particular business
  describe('/GET /businesses/:businessId/reviews', () => {
    it('should get a reviews about a particular business', (done) => {
      chai.request(server)
        .get('/businesses/0/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

