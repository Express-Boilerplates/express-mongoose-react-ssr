const assignUser = (req, res, next) => {
    req.body.author = req.user._id
    next()
}
export default assignUser
