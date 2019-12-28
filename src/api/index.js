import express from 'express'

const router = express.Router()

import UserRoutes from './User/route'

router.use('/users', UserRoutes)

export default router
