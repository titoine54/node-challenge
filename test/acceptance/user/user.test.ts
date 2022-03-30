import { Api } from '../utils/api';

describe('Given that the user domain is healthy', () => {
  describe('V1 user domain routes', () => {
    test('Test get all users', (done) => {
      Api.get('/user/v1/users')
        .expect(200, done)
    });

    test('Test get 1 user', (done) => {
      Api.get('/user/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200, done)
    });
  });

  describe('Validate output of get all users', () => {
    it('should return 2 users when limit = 2', async () => {
      const response = await Api.get('/user/v1/users?limit=2');
      expect(response.body).toHaveLength(2)
    });
  });

  describe('Validate output of get user', () => {
    it('should return the correct user ', async () => {
      const response = await Api.get('/user/v1/users/da140a29-ae80-4f0e-a62d-6c2d2bc8a474');
      console.log(response.body)
      expect(response.body).toStrictEqual(
        "{\"first_name\":\"Jeppe\",\"last_name\":\"Rindom\",\"company_name\":\"pleo\"}"
      );
    });
  });
});
