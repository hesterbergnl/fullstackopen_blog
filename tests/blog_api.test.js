const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const app = require('../app')

const api = supertest(app)

const newPost = {
  title: 'New Third post!',
  author: 'Nikolai',
  url: 'http://testurl.com/3',
  likes: 5
}

const newPostNoLikes = {
  title: 'New Third post!',
  author: 'Nikolai',
  url: 'http://testurl.com/4',
}

const newPostNoTitle = {
  author: 'Nikolai',
  url: 'http://testurl.com/5',
  likes: 5
}

const newPostNoUrl = {
  title: 'No Url!!',
  author: 'Nikolai',
  likes: 2
}

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let post of helper.initialPosts) {
    let postObject = new Blog(post)
    await postObject.save()
  }
})

describe ('Verifying notes returned', () => {
  test('notes are returned as json', async () =>{
    await api
      .get('/api/posts')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/posts')

    expect(response.body).toHaveLength(helper.initialPosts.length)
  })

  test('a specific note is returned', async () => {
    const response = await api.get('/api/posts')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('First Post!')
  })

  test('property id exists', async () => {
    const response = await api.get('/api/posts')

    expect(response.body[0].id).toBeDefined()
  })
})

describe ('Adding new notes', () => {
  test('add new note', async () => {
    let newBlogObj = new Blog(newPost)
    await newBlogObj.save()

    const response = await api.get('/api/posts')

    const contents = response.body.map(r => r.title)
    expect(contents).toHaveLength(helper.initialPosts.length + 1)
    expect(contents).toContain('New Third post!')
  })

  test('add post with no likes', async () => {
    let newBlogObj = new Blog(newPostNoLikes)
    const res = await newBlogObj.save()

    console.log(res)
    expect(res.likes).toBe(0)
  })

  test('add post with no title', async () => {
    await api
      .post('/api/posts')
      .send(newPostNoTitle)
      .expect(400)

  })

  test('add post with no url', async () => {
    await api
      .post('/api/posts')
      .send(newPostNoUrl)
      .expect(400)
  })
})

describe ('Delete blog', () => {
  test('delete blog', async () => {
    const startingBlogs = await api.get('/api/posts')
    const blogToDelete = startingBlogs.body[0]

    console.log(blogToDelete)

    await api
      .delete(`/api/posts/${blogToDelete.id}`)
      .expect(204)

    const endingBlogs = await api.get('/api/posts')

    expect(endingBlogs.body).toHaveLength(helper.initialPosts.length - 1)

    const titles = endingBlogs.body.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe ('Update blog', () => {
  test('update blog likes', async () => {
    const startingBlogs = await api.get('/api/posts')
    const blogToUpdate = startingBlogs.body[0]

    console.log(blogToUpdate)

    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 11
    }

    await api
      .put(`/api/posts/${blogToUpdate.id}`)
      .send(updatedBlog)

    const endingBlogs = await api.get('/api/posts')

    expect(endingBlogs.body).toHaveLength(helper.initialPosts.length)

    const likes = endingBlogs.body.map(r => r.likes)

    expect(likes).toContain(11)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
