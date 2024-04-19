import Mongoose, { Document } from 'mongoose'

interface IProduct extends Document {
  name: string
  description: string
  user: Mongoose.Schema.Types.ObjectId
}

const productSchema = new Mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product must have a name!'],
    minlength: [5, 'Product name must be more than 5 character!'],
    maxlength: [50, 'Product name must be less than 50 character!'],
  },
  description: {
    type: String,
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The Product must belong to an user'],
    select: false,
  },
})

// select user fields by middleaware

const ProductModel = Mongoose.model<IProduct>('product', productSchema)
export default ProductModel
