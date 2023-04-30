const Blog = require('../models/blog')
const User = require('../models/user')

const initialPosts = [
  {
    title: 'First Post!',
    url: 'http://testurl.com/1',
    likes: 6
  },
  {
    title: 'Second Post!',
    url: 'http://testurl.com/2',
    likes: 3
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialPosts, blogsInDb, usersInDb
}
