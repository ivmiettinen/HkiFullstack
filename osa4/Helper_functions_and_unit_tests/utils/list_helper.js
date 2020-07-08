const dummy = (blogs) => {

    blogs = 1

    return blogs

}


const totalLikes = (blogPosts) => {

    if(blogPosts.length >= 1) {let reducer = (reducer, sum) => {

        return reducer + sum.likes

    }

    return blogPosts.reduce(reducer, 0)
    }

    if(blogPosts.length === 0){
        return 0
    }


}



// let reducer = ((a, b) => a.likes > b.likes ? a : b)

const mostPopularBlog = (mostPopular) => {




  let reducer2 = mostPopular.reduce(function (a, b)  {
    return (a.likes > b.likes) ? a : b
  })


  let titleAuthorLikes = 'title: ' + reducer2.title + '\n' + 'author: '+ reducer2.author + '\n' + 'likes: ' + reducer2.likes


  let titleAuthorLikes2 = [{title: reducer2.title, author: reducer2.author, likes: reducer2.likes}]


return titleAuthorLikes2

}


// let reducer = ((a, b) => a.likes > b.likes ? a : b)


module.exports = { dummy, totalLikes, mostPopularBlog }