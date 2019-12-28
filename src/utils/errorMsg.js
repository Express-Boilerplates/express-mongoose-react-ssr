/**
 *
 * @param {*} type
 * @param {*} statusCode
 * @param {*} errors
 * @param {*} message
 * @param {*} stack
 */
const errorMsg = ({ type, statusCode = 400, errors, message, stack }) => ({
    type,
    statusCode,
    message,
    errors,
    stack,
})

export default errorMsg
