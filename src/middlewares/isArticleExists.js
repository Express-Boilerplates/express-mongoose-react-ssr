import AppError from '../utils/AppError'
import catchErrors from '../utils/catchErrors'
import Article from '../api/Article/model'

const isArticleExists = catchErrors((req, res, next) => {
    res.json(req.json(req.params))
    // throw new AppError('আরটিক্যাল খুজে পাওয়া যায়নি', 404)
    // next()
})

export default isArticleExists
