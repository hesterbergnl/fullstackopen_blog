const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialPosts = [
  {
    title: 'First Post!',
    author: 'Nikolai',
    url: 'http://testurl.com/1',
    likes: 6
  },
  {
    title: 'Second Post!',
    author: 'Hannah',
    url: 'http://testurl.com/2',
    likes: 3
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialPosts[0])
  await blogObject.save()

  blogObject = new Blog(initialPosts[1])
  await blogObject.save()
})

test('notes are returned as json', async () =>{
  await api
    .get('/api/posts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/posts')

  expect(response.body).toHaveLength(initialPosts.length)
})

test('a specific note is returned', async () => {
  const response = await api.get('/api/posts')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain('First Post!')
})

afterAll(async () => {
  await mongoose.connection.close()
})
