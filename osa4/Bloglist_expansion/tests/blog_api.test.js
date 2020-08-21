const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const { keyBy } = require('lodash');
const { initialNotes } = require('./test_helper');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

//Alustus:

beforeEach(async () => {
  await Blog.deleteMany({});

  await User.deleteMany({});



  const blogObjects = helper.initialNotes.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});



//4.8:

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToCompare = blogsAtStart;

  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialNotes.length);
});

//4.9:

test('blogs identification field is id', async () => {
  const blogsAtStart = await helper.blogsInDb();



  const specificId = blogsAtStart[0];

  const getOneId = await api.get(`/api/blogs/${specificId.id}`);

  expect(getOneId.body.id).toBeDefined();


});

//4.10 && 4.22

test('a new blog can be added if there is a token included', async () => {
  const newUser = {
    username: 'ile',
    name: 'ile',
    password: 'salainen',
  };

  const apiUsers = await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log('API USERS', apiUsers.body);

  console.log('newUser', newUser);

  const usersAtStart = await helper.usersInDb();

  console.log('usersAtStart', usersAtStart);

  const apiLogin = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  //   const tokenEsiin = await api.get('/api/login');

  //   console.log('tokenEsiin', tokenEsiin);

  const tokenFromLogin = await apiLogin.body.token;

  console.log('nakyykoToken', tokenFromLogin);

  console.log('LOGIN ja token', apiLogin.body.token);

  //   const token = apiLogin.map((b) => b.token);

  //   console.log('TOKEN', token);

  const newBlogPost4 = new Blog({
    title: 'Ile is very cool',
    author: 'Suzy Shield',
    url: 'www.altavista.fi',
    likes: 11,
  });

  const postaus = await api
    .post('/api/blogs')
    .send(newBlogPost4)
    .set('Authorization', `Bearer ${tokenFromLogin}`)
    .expect(200)
    .expect(`Content-Type`, /application\/json/);

  console.log('postaus ja body', postaus.body);

  const responseGetBlogs = await api.get('/api/blogs');

  console.log('responseGetBlogs 7', responseGetBlogs.body.length);

  const contents = responseGetBlogs.body.map((a) => a.title);

  const blogsAtTheEnd = await helper.blogsInDb();
  //   console.log('blogitLopussa length:', blogitLopussa.length)
  //   console.log('helper initial notes length', helper.initialNotes.length)
  expect(blogsAtTheEnd).toHaveLength(helper.initialNotes.length + 1);
  expect(contents).toContain('Ile is very cool');
});

//4.11

test('if likes field is empty, value is 0', async () => {
  const newBlogPost2 = {
    title: 'Hey hey, my my',
    author: 'Stephan Frank',
    url: 'www.yle.fi',
  };

  const newBlogPost3 = {
    title: 'Humble me',
    author: 'Adam Mark',
    url: 'www.google.fi',
    likes: 0,
  };

  const newUser = {
    username: 'ile2',
    name: 'ile2',
    password: 'salainen2',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAtStart = await helper.usersInDb();

  console.log('usersAtStart', usersAtStart);

  const apiLogin = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = apiLogin.body.token;

  await api
    .post('/api/blogs')
    .send(newBlogPost2)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.author);

  const contents2 = response.body.map((r) => r);

  //   console.log('CONTENTSSSS', contents2)

  function findByName(name) {
    return name.title === 'Hey hey, my my';
  }

  const findForTest = contents2.find(findByName);

  //   console.log('findi', findForTest )

  expect(findForTest.likes).toEqual(newBlogPost3.likes);
  expect(findForTest.likes).toEqual(0);

  expect(contents).toContain('Stephan Frank');
});

//4.12

test('400 bad request for blog posts without  title and url fields', async () => {
  const newUser = {
    username: 'ile34',
    name: 'ile34',
    password: 'salainen',
  };

  
      const blogsAtStart = await helper.blogsInDb()

    console.log('blogsAtStart', blogsAtStart)


  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const apiLogin = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const loginToken = await apiLogin.body.token;

  const blogPostWithoutFields = new Blog({
    author: 'Jim Halpert',
    likes: 0,
  });

  await api
    .post('/api/blogs')
    .send(blogPostWithoutFields)
    .set('Authorization', `Bearer ${loginToken}`)
    .expect(400);



  const blogsAtTheEnd = await helper.blogsInDb();



  expect(blogsAtStart).toHaveLength(blogsAtTheEnd.length)


});

//4.22

// test('a new blog can be added if there is a token included', async () => {
//   const passwordHash = await bcrypt.hash('sekret', 10);

//   const newUser = {
//     username: 'ile',
//     name: 'ile',
//     password: 'salainen',
//   };

//   const apiUsers = await api
//     .post('/api/users')
//     .send(newUser)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   console.log('API USERS', apiUsers.body);

//   console.log('newUser', newUser);

//   const usersAtStart = await helper.usersInDb();

//   console.log('usersAtStart', usersAtStart);

//   const apiLogin = await api
//     .post('/api/login')
//     .send(newUser)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   const tokenFromLogin = await apiLogin.body.token;

//   console.log('nakyykoToken', tokenFromLogin);

//   console.log('LOGIN ja token', apiLogin.body.token);

//   //   const token = apiLogin.map((b) => b.token);

//   //   console.log('TOKEN', token);

//   const newBlogPost4 = new Blog({
//     title: 'Ile is very cool',
//     author: 'Suzy Shield',
//     url: 'www.altavista.fi',
//     likes: 11,
//   });

//   const postaus = await api
//     .post('/api/blogs')
//     .send(newBlogPost4)
//     .set('Authorization', `Bearer ${tokenFromLogin}`)
//     .expect(200)
//     .expect(`Content-Type`, /application\/json/);

//   console.log('postaus ja body', postaus.body);

//   const responseGetBlogs = await api.get('/api/blogs');

//   console.log('responseGetBlogs 7', responseGetBlogs.body.length);

//   const blogsAtTheEnd = await helper.blogsInDb();
//   //   console.log('blogitLopussa length:', blogitLopussa.length)
//   //   console.log('helper initial notes length', helper.initialNotes.length)
//   expect(blogsAtTheEnd.length).toBe(helper.initialNotes.length + 1);
// });

// afterEach(async () => {
//     await User.deleteMany({});
//   });

//

//My own test:

// test('match id fields', async () => {

//     const blogsAtStart = await helper.blogsInDb()

//     // console.log('blogsAtStart', blogsAtStart)

//     const noteToView = blogsAtStart[0]

//     // console.log('noteToView', noteToView)

//     // const allBlogs = await api.get('/api/blogs/')

//     // const TestiHenkilo = {
//     //     id: '5a422a851b54a676234d17f7',
//     //     title: 'React patterns',
//     //     author: 'Michael Chan',
//     //     url: 'https://reactpatterns.com/',
//     //     likes: 7,
//     //     blogs: 1,
//     //     __v: 0,
//     // }

//     expect(noteToView).toHaveProperty('id')

// })

test('a new blog cant be added, if there isnt a token included', async () => {
  const newUser = {
    username: 'ilmanTokenia',
    name: 'ilmanTokenia',
    password: 'salainen158',
  };

  const apiUsers = await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log('API USERS', apiUsers.body);

  console.log('newUser', newUser);

  const usersAtStart = await helper.usersInDb();

  console.log('usersAtStart', usersAtStart);

  const apiLogin = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);



  const tokenFromLogin = await apiLogin.body.token;

//   console.log('nakyykoToken', tokenFromLogin);

//   console.log('LOGIN ja token', apiLogin.body.token);



  const newBlogPost4 = new Blog({
    title: 'Ile is very cool',
    author: 'Suzy Shield',
    url: 'www.altavista.fi',
    likes: 11,
  });

  const postaus = await api
    .post('/api/blogs')
    .send(newBlogPost4)
    .expect(401)
    .expect(`Content-Type`, /application\/json/);

  console.log('postausss', postaus.body);

  console.log('postausError', postaus.body.error);

  expect(postaus.body.error).toEqual('invalid token');

  expect(postaus.statusCode).toEqual(401);


});

//////////////////////////////////////

afterAll(() => {
  mongoose.connection.close();
});

