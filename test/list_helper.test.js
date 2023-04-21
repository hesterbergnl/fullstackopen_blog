const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful 1',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17ff',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    }
  ]

  const listEmpty = []

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('three blogs, sum total', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    expect(result).toBe(13)
  })

  test('empty list, zero likes', () => {
    const result = listHelper.totalLikes(listEmpty)
    expect(result).toBe(0)
  })
})

describe('most likes is favorite', () => {
  const blog1 =
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

  const blog2 =
    {
      _id: '5a422aa71b54a676234d17ff',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }

  const blog3 =
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    }

  const listWithOneBlog = [
    blog1
  ]

  const listWithThreeBlogs = [
    blog1,
    blog2,
    blog3
  ]

  const listEmpty = []

  test('when list has only one blog, most likes is that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blog1)
  })

  test('three blogs, sum total', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(result).toEqual(blog3)
  })

  test('empty list, zero likes', () => {
    const result = listHelper.favoriteBlog(listEmpty)
    expect(result).toEqual(null)
  })
})

describe('most blog posts by author', () => {
  const blog1 =
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

  const blog2 =
    {
      _id: '5a422aa71b54a676234d17ff',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Nikolai',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }

  const blog3 =
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    }

  const threeAuthors = {
    author: 'Edsger W. Dijkstra',
    blogs: 2
  }

  const oneAuthor = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  }

  const listWithOneBlog = [
    blog1
  ]

  const listWithThreeBlogs = [
    blog1,
    blog2,
    blog3
  ]

  const listEmpty = []

  test('when list has only one blog, most posts is Edsger!', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(oneAuthor)
  })

  test('three blogs, Edsger wins', () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs)
    expect(result).toEqual(threeAuthors)
  })

  test('empty list, null', () => {
    const result = listHelper.mostBlogs(listEmpty)
    expect(result).toBe(0)
  })
})

describe('liked author', () => {
  const blog1 =
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }

  const blog2 =
    {
      _id: '5a422aa71b54a676234d17ff',
      title: 'Go To Statement Considered Harmful 2',
      author: 'Nikolai',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    }

  const blog3 =
    {
      _id: '5a422aa71b54a676234d17fa',
      title: 'Go To Statement Considered Harmful 3',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    }

  const threeAuthors = {
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  const oneAuthor = {
    author: 'Edsger W. Dijkstra',
    likes: 5
  }

  const listWithOneBlog = [
    blog1
  ]

  const listWithThreeBlogs = [
    blog1,
    blog2,
    blog3
  ]

  const listEmpty = []

  test('when list has only one blog, most posts is Edsger!', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(oneAuthor)
  })

  test('three blogs, Edsger wins', () => {
    const result = listHelper.mostLikes(listWithThreeBlogs)
    expect(result).toEqual(threeAuthors)
  })

  test('empty list, null', () => {
    const result = listHelper.mostLikes(listEmpty)
    expect(result).toBe(0)
  })
})
