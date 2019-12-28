import { Schema, model } from 'mongoose'
import { hash } from 'bcryptjs'
import { v4 } from 'uuid'
import uniqueValidator from 'mongoose-unique-validator'

import validator from 'validator'

const SchemaDefinition = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Name is required'],
        },
        username: {
            type: String,
            unique: [true, 'Username already taken'],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            unique: [true, 'Email already taken'],
            trim: true,
            lowercase: true,
            validate: [
                {
                    validator: validator.isEmail,
                    message: 'Email is not valid',
                },
            ],
        },
        bio: String,
        profilePhoto: {
            type: String,
            trim: true,
            validate: [validator.isURL, 'Invalid url'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        confirm_password: {
            type: String,
            required: [true, 'Password Confirmation is required'],
            validate: {
                validator: function(confirm_password) {
                    return confirm_password === this.password
                },
                message: 'Password did not matched',
            },
        },
        passwordResetToken: String,
        emailVerificationToken: String,
        passwordResetExpires: Date,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

SchemaDefinition.virtual('articles', {
    ref: 'Article',
    foreignField: 'author',
    localField: '_id',
})

SchemaDefinition.pre('save', async function(next) {
    this.password = await hash(this.password, 10)

    /**
     * Email verification
     */
    let token = v4()
    this.emailVerificationToken = token
    // let url = `${process.env.APP_URL}/auth/email-verify/${token}`
    // let email = new Email(user, url)
    // email.send('welcome', 'Welcome to TechDiary.blog')

    this.confirm_password = undefined
    next()
})

SchemaDefinition.plugin(uniqueValidator, {
    message: '{PATH} already taken',
})

export default model('User', SchemaDefinition)
