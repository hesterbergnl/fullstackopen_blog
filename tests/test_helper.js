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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialPosts, blogsInDb
}
