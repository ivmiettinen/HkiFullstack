const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    // console.log('body:', body)

    const saltRounds = 10

    if (body.password === undefined) {
        return response.status(400).json({
            error: 'password must be included in your post',
        })
    }

    if (body.password.length < 3) {
        return response.status(400).json({
            error: 'password must be 3 letters or longer',
        })
    }

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // console.log('passwordddd', passwordHash)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    // const allUsers = await User.find({})

    // const checkAllUsers = allUsers.map((param) => param.username)

    // const findUsername = checkAllUsers.includes(body.username)

    // if (findUsername === true) {
    //     return response
    //         .status(400)
    //         .json({ error: 'Username is already in use' })
    // }

    // if (body.username === undefined || body.username.length < 3) {
    //     return response.status(400).json({
    //         error: 'username must be included and be 3 letters or longer',
    //     })
    // }



    try {
        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const allUsers = await User.find({})

        if (allUsers) {
            response.json(allUsers.map((r) => r.toJSON()))
        } else {
            response.status(404).end()
        }
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
