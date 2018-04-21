const store = {
  businesses: [
    {
      CompanyName: 'Fashion House',
      Address: '2 olu dara street',
      State: 'Lagos',
      Telephone: '0806432xxxx',
      Website: 'www.Fhouse.com',
      Location: 'America',
      Category: 'tech',
      reviews: [{ review1: 'good business' }, { review2: 'great business' }],
    },
    {
      CompanyName: 'Kepasky',
      Address: '2 olu dara street',
      State: 'moscow',
      Telephone: '0806432xxxx',
      Website: 'www.Fhouse.com',
      Location: 'Russia',
      Category: 'software',
      reviews: [],
    }],
  signUp: [{ username: 'email', password: 'password', retypedPassword: 'password' }],
  LogIn: [{ username: 'name', password: 'password' }],
};

module.exports = store;
