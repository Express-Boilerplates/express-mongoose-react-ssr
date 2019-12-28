const formatMongooseValidationErrors = errors => {
    let errorsObj = {}
    Object.keys(errors).forEach(key => (errorsObj[key] = errors[key].message))
    return errorsObj
}

export default formatMongooseValidationErrors
