import mongoose from "mongoose";
import { categorySchema } from "../features/product/category.schema.js";
const url = process.env.DB_URL
mongoose.connect(url)

export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, { useNewParser: true, useUnifiedTopolgy: true })
    console.log('connected using mongoose');
    addCategories()
  } catch (error) {
  }
};
async function addCategories() {
  const CategoryModel = mongoose.model('Category', categorySchema);
  const categories = await CategoryModel.find()
  if (categories.length == 0) {
    await CategoryModel.insertMany(
      [
        { name: 'Books' },
        { name: 'Clothing' },
        { name: 'Mobiles' },
        { name: 'Gadget' },
        { name: 'Tshirt' },
        { name: 'Science' }
      ]
    )
    console.log('Categories are added');
  }
}