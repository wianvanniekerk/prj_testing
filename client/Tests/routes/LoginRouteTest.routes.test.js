const request = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../../models/register');
const loginRouter = require('../../routes/api/loginRoutes');

// Mocking dependencies
jest.mock('../../models/register');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/api', loginRouter);

describe('POST /login', () => {
  let user;
  let validPassword = 'password123';
  let invalidPassword = 'wrongpassword';

  beforeEach(() => {
    user = {
      _id: 'userId',
      username: 'john.doe',
      password: 'hashedPassword'
    };

    Register.findOne.mockImplementation(({ username }) => {
      return username === user.username ? Promise.resolve(user) : Promise.resolve(null);
    });

    bcrypt.compare.mockImplementation((password, hashedPassword) => {
      return password === validPassword ? Promise.resolve(true) : Promise.resolve(false);
    });

    jwt.sign.mockImplementation(() => 'fakeToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully authenticate with valid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: user.username, password: validPassword })
      .expect(200);

    expect(response.body.message).toBe('Login successful');
    expect(response.body.accessToken).toBe('fakeToken');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: user.username, password: invalidPassword })
      .expect(401);

    expect(response.body.message).toBe('Invalid username or password');
  });

  it('should return 500 if there is an error during login', async () => {
    Register.findOne.mockImplementation(() => Promise.reject(new Error('Database error')));

    const response = await request(app)
      .post('/api/login')
      .send({ username: user.username, password: validPassword })
      .expect(500);

    expect(response.body.message).toBe('Database error');
  });

  it('should handle missing credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({})
      .expect(401);

    expect(response.body.message).toBe('Invalid username or password');
  });

  it('should handle partial credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'john.doe' })
      .expect(401);

    expect(response.body.message).toBe('Invalid username or password');
  });
});

