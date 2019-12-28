import errorMsg from '$utils/errorMsg'
import formatMongooseValidationErrors from '$utils/formatters/formatMongooseValidationErrors'

export default (error, req, res, next) => {
    /**
     * -----------------------------------------------------------------
     *      Catch Validation Errors
     * -----------------------------------------------------------------
     */

    console.log(JSON.stringify(error, undefined, 4))

    // error thrown by AppError
    if (error.name === 'AppError') {
        res.status(error.statusCode).json(
            errorMsg({
                type: error.name,
                message: error.message,
                statusCode: error?.statusCode,
                stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined,
            })
        )
    }

    if (error.name === 'ValidationError') {
        let errors = formatMongooseValidationErrors(error.errors)
        res.status(406).json(
            errorMsg({
                errors,
                type: error.name,
                statusCode: 406,
                message: 'You have some validation error',
                stack: process.env.NODE_ENV === 'dev' ? error.stack : undefined,
            })
        )
    }

    /**
     * -----------------------------------------------------------------
     *      Internal server Errors
     * -----------------------------------------------------------------
     */

    res.status(error.statusCode || 500).json(
        errorMsg({
            type: error.name,
            message: error.message,
            statusCode: error.statusCode || 500,
            errors: error?.errors,
            stack: process.env.NODE_ENV === 'dev' ? error?.stack : undefined,
        })
    )
}
