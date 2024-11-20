const isAuthenticated = require('../../routes/api/verifyToken');
const jwt = require('jsonwebtoken');

// Mock jwt.verify
jest.mock('jsonwebtoken');

describe('isAuthenticated middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { sendStatus: jest.fn() };
    next = jest.fn();
  });

  test('calls next() if token is valid', () => {
    req.headers.authorization = 'validToken';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { user: 'validUser' });
    });

    isAuthenticated(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', process.env.JWT_SECRET, expect.any(Function));

    expect(req.user).toEqual({ user: 'validUser' });
    expect(next).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
  });

 /* test('returns 401 if no token is provided', () => {
    isAuthenticated(req, res, next);

    expect(jwt.verify).not.toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });*/

  test('returns 403 if token is invalid', () => {
    req.headers.authorization = 'invalidToken';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    isAuthenticated(req, res, next);


    expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.JWT_SECRET, expect.any(Function));

    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
