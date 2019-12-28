import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import AppError from '$utils/AppError'
import User from '$api/User/model'
import catchErrors from '$utils/catchErrors'

const isAuthenticated = catchErrors(async (req, res, next) => {
    let token = req.cookies.token

    if (!token) {
        throw new AppError('Token not provided', 403)
    } else {
        let { userId } = await promisify(jwt.verify)(
            token,
            process.env.APP_SECRET
        )
        const user = await User.findOne({ _id: userId })
        req.user = user

        next()
    }
})

export default isAuthenticated
