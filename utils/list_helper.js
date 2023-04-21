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
    var index = authors.map((e) => e.author).indexOf(blog.author)
    
    if (index !== -1) {
      authors[index].blogs = authors[index].blogs + 1
    }
    else if (index === -1) {
      authors.push({
        "author":blog.author,
        "blogs":1
      })
    }
    
    logger.info('blog author type: ', typeof blog.author)
    logger.info('authors author type: ', typeof authors[0].author)
    logger.info(authors)
  })

  const reducer = (prev, current) => {
    return (prev.blogs > current.blogs) ? prev : current
  }

  return authors.length === 0 ? 0 : authors.reduce(reducer)
}

const mostLikes = (blogs) => {
  var authors = []

  blogs.forEach(blog => {
    var index = authors.map((e) => e.author).indexOf(blog.author)
    
    if (index !== -1) {
      authors[index].likes = authors[index].likes + blog.likes
    }
    else if (index === -1) {
      authors.push({
        "author":blog.author,
        "likes":blog.likes
      })
    }
    
    logger.info(authors)
  })

  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }

  return authors.length === 0 ? 0 : authors.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
