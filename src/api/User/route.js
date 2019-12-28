import { Router } from 'express'
import isAuthenticated from '$middlewares/isAuthenticated'

import {
    register,
    login,
    me,
    users,
    logout,
    updateProfile,
    updatePassword,
} from './controller'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/update-profile', isAuthenticated, updateProfile)
router.post('/update-password', isAuthenticated, updatePassword)
router.get('/me', me)
router.get('/users', users)
router.post('/logout', isAuthenticated, logout)

export default router
