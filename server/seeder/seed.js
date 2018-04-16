const store = {
  businesses: [{
    CompanyName: 'Fashion House',
    Address: '2 olu dara street',
    State: 'Lagos',
    Telephone: '0806432xxxx',
    Website: 'www.Fhouse.com',
    location: 'Nigeria',
    category: 'tech',
    reviews: [{ review1: 'good business' }, { review2: 'great business' }],
  },
  {
    CompanyName: 'Kepasky',
    Address: '2 olu dara street',
    State: 'moscow',
    Telephone: '0806432xxxx',
    Website: 'www.Fhouse.com',
    location: 'Russia',
    category: 'software',
    reviews: [{ review1: 'not a bad business' }, { review2: 'customers service is bad' }],
  }],
  signUp: [{ username: 'email', password: 'password', retypedPassword: 'password' }],
  LogIn: [{ username: 'name', password: 'password' }],
};

module.exports = store;
