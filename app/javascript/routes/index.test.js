import routes from './index';

describe('routes', () => {
  test('supports the required query params and format', () => {
    expect(routes.otps.generate({ email: 'sample_email.com' })).toEqual(
      '/otps/generate.json?email=sample_email.com',
    );
  });
});
