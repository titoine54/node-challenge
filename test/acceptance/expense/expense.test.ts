import { Api } from '../utils/api';

describe('Given that the expense domain is healthy', () => {
  describe('V1 expense domain routes', () => {
    test('Test get all expenses', (done) => {
      Api.get('/expense/v1/expenses')
        .expect(200, done)
    });

    test('Test get 1 expense', (done) => {
      Api.get('/expense/v1/expenses/3e920f54-49df-4d0b-b11b-e6f08e3a2dca')
        .expect(200, done)
    });

    test('Test get all expenses for 1 user', (done) => {
      Api.get('/expense/v1/expenses/user/da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200, done)
    });
  });

  describe('Validate output of get all expenses', () => {
    it('should return 3 expenses when limit = 3', async () => {
      const response = await Api.get('/expense/v1/expenses?limit=3');
      expect(response.body).toHaveLength(3)
    });

    it('should return the correct expense when filter={"id":"314d54f4-8a5f-4c1d-b735-426b54794a44"}', async () => {
      const response = await Api.get('/expense/v1/expenses?filter={"id":"314d54f4-8a5f-4c1d-b735-426b54794a44"}');
      expect(response.body).toHaveLength(1)
      expect(response.body[0]).toEqual(
        expect.objectContaining({id: "314d54f4-8a5f-4c1d-b735-426b54794a44"}),
      );
    });

    describe('Validate output of get all expenses for a user', () => {
      it('should return correct set of expenses for the user and in the correct sort order', async () => {
        const response = await Api.get('/expense/v1/expenses/user/da140a29-ae80-4f0e-a62d-6c2d2bc8a474?sort={"amount_in_cents":"ASC"}');
        expect(response.body).toHaveLength(3)
        expect(response.body[0]).toEqual(expect.objectContaining({id: "f20866f9-7d46-45f2-822c-4b568e216a13"}));
        expect(response.body[0]).toEqual(expect.objectContaining({amount_in_cents: 6000}));
        expect(response.body[1]).toEqual(expect.objectContaining({id: "3e920f54-49df-4d0b-b11b-e6f08e3a2dca"}));
        expect(response.body[1]).toEqual(expect.objectContaining({amount_in_cents: 8000}));
        expect(response.body[2]).toEqual(expect.objectContaining({id: "314d54f4-8a5f-4c1d-b735-426b54794a44"}));
        expect(response.body[2]).toEqual(expect.objectContaining({amount_in_cents: 12000}));
      });
    });
  });
});
