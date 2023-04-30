const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const newPost = {
  title: 'New Third post!',
  url: 'http://testurl.com/3',
  likes: 5
}

const newPostNoLikes = {
  title: 'New Third post!',
  url: 'http://testurl.com/4',
}

const newPostNoTitle = {
  url: 'http://testurl.com/5',
  likes: 5
}

const newPostNoUrl = {
  title: 'No Url!!',
  likes: 2
}

const newUser = {
  username: 'testing',
  password: '123'
}

var token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const result = await api
    .post('/api/users')
    .send(newUser)

  const res = await api
    .post('/api/login')
    .send(newUser)

  token = `Bearer ${res.body.token}`

  for (let post of helper.initialPosts) {
    const res = await api
      await api
      .post('/api/blogs')
      .send(post)
      .set({ Authorization: token })
  }
})

describe ('Verifying notes returned', () => {
  test('notes are returned as json', async () =>{
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialPosts.length)
  })

  test('a specific note is returned', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('First Post!')
  })

  test('property id exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe ('Adding new notes', () => {
  test('add new note', async () => {
    await api
      .post('/api/blogs')
      .send(newPost)
      .set({ Authorization: token })
      .expect(201)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toHaveLength(helper.initialPosts.length + 1)
    expect(contents).toContain('New Third post!')
  })

  test('add post with no likes', async () => {
    const res = await api
      .post('/api/blogs')
      .send(newPostNoLikes)
      .set({ Authorization: token })

    expect(res.body.likes).toBe(0)
  })

  test('add post with no title', async () => {
    await api
      .post('/api/blogs')
      .send(newPostNoTitle)
      .set({ Authorization: token })
      .expect(400)

  })

  test('add post with no url', async () => {
    await api
      .post('/api/blogs')
      .send(newPostNoUrl)
      .set({ Authorization: token })
      .expect(400)
  })

  test('attempt post without authorization', async () => {
    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(401)
  })
})

describe ('Delete blog', () => {
  test('delete blog', async () => {
    const startingBlogs = await api.get('/api/blogs')
    const blogToDelete = startingBlogs.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: token })
      .expect(204)

    const endingBlogs = await api.get('/api/blogs')

    expect(endingBlogs.body).toHaveLength(helper.initialPosts.length - 1)

    const titles = endingBlogs.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe ('Update blog', () => {
  test('update blog likes', async () => {
    const startingBlogs = await api.get('/api/blogs')
    const blogToUpdate = startingBlogs.body[0]

    const updatedBlog = {
      title: blogToUpdate.title,
      url: blogToUpdate.url,
      likes: 11
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .set({ Authorization: token })

    const endingBlogs = await api.get('/api/blogs')

    expect(endingBlogs.body).toHaveLength(helper.initialPosts.length)

    const likes = endingBlogs.body.map(r => r.likes)

    expect(likes).toContain(11)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
