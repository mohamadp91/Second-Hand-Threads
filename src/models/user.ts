import Mongoose, { Document } from 'mongoose'
import Validator from 'validator'
import bcrypt from 'bcryptjs'

import { confirmPasswords, validatePassword } from './validators'

interface IUser extends Document {
  username: string
  email: string
  password: string
  passwordConfirm?: string
  role: string
}

const userSchema = new Mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: [true, 'A user must have a username'],
    minlength: [3, 'Username must be more than 3 letters'],
    maxlength: [20, 'Username must be less than 20 letters'],
  },
  email: {
    type: String,
    required: [true, 'User must have an email!'],
    lowercase: true,
    unique: true,
    minlength: [5, 'Email must be more than 5 letters!'],
    maxlength: [20, 'Email must be less than 20 letters!'],
    validate: [Validator.isEmail, 'Please enter a valid email!'],
  },
  password: {
    type: String,
    unique: true,
    minlength: [8, 'Password must be more than 8 characters!'],
    select: false,
    validate: {
      validator: (password: string) => validatePassword(password),
      message: 'Please provide a stronger password!',
    },
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IUser, el: string) {
        confirmPasswords(this.password, el)
      },
      message: 'Please confirm you password!',
    },
  },
  role: {
    type: String,
    enum: ['admin', 'buyer', 'seller'],
    default: 'buyer',
    required: true,
  },
})

userSchema.pre('save', async function (next: any) {
  if (!this.password) {
    return next('Please enter your password!')
  }
  this.passwordConfirm = undefined
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const UserModel = Mongoose.model<IUser>('user', userSchema)
export default UserModel
