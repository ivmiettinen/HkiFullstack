const dummy = (blogs) => {
    blogs = 1

    return blogs
}

const totalLikes = (blogPosts) => {
    if (blogPosts.length >= 1) {
        let reducer = (reducer, sum) => {
            return reducer + sum.likes
        }

        return blogPosts.reduce(reducer, 0)
    }

    if (blogPosts.length === 0) {
        return 0
    }
}

// let reducer = ((a, b) => a.likes > b.likes ? a : b)

const mostPopularBlog = (mostPopular) => {
    let reduceToPopular = mostPopular.reduce(function (a, b) {
        return a.likes > b.likes ? a : b
    })

    let titleAuthorLikes = [
        {
            title: reduceToPopular.title,
            author: reduceToPopular.author,
            likes: reduceToPopular.likes,
        },
    ]


    return titleAuthorLikes
}

var _ = require('lodash')

//4.6

let allTheBloggersArray = [
    {
        author: 'Michael Chan',
        likes: 12,
        blogs: 5,
    },
    {
        author: 'Trouble Maker',
        likes: 52,
        blogs: 17,
    },
    {
        author: 'Eazy Beazy',
        likes: 4,
        blogs: 213,
    },
    {
        author: 'Jack Hack',
        likes: 2,
        blogs: 3,
    },
]

const mostBlogs = (mostBlogs) => {
    let mostPopularAuthor = _.chain(allTheBloggersArray)
        .groupBy('author')
        .map((blogs, author) => ({
            author,
            blogs: blogs.reduce((a, b) => {
                return a + b.blogs
            }, 0),
        }))
        .orderBy('blogs', ['asc'])
        .last()
        .value()

    // console.log('clog - mostPopularAuthor', mostPopularAuthor)

    return mostPopularAuthor

    // console.log('mostPopularAuthor: ', mostPopularAuthor)

    // let withReduce = allTheBloggersArray.reduce(function (a, b) {
    //     return a.blogs > b.blogs ? a : b
    // })

    // console.log('withReduce,', withReduce)

    // let titleAuthorLikes = [
    //     {
    //         author: withReduce.author,
    //         blogs: withReduce.blogs,
    //     },
    // ]

    // console.log('withReduceTheAuthor:', titleAuthorLikes)
}

//4.7

const mostLikes = (mostlikes) => {
    const blogWithMostLikes = _.chain(allTheBloggersArray)
        .groupBy('author')
        .map((likes, author) => ({
            author,
            likes: likes.reduce((a, b) => {
                return a + b.likes
            }, 0)
        }))
        .orderBy('likes', ['asc'])
        .last()
        .value()


    // console.log('mostLikes', blogWithMostLikes)

    return blogWithMostLikes
}




module.exports = { dummy, totalLikes, mostPopularBlog, mostBlogs, mostLikes }
