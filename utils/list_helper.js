const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }

  return blogs.length === 0 ? null : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  var authors = []

  blogs.forEach(blog => {
    var object = authors.find(author => author.name === blog.author)
    logger.info(object)
    if (object !== undefined) {
      object.blogs += 1
    }
    else {
      authors.push({
        "author":blog.author,
        "blogs":1
      })
    }
  })

  const reducer = (prev, current) => {
    return (prev.blogs > current.blogs) ? prev : current
  }

  return authors.length === 0 ? 0 : authors.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
