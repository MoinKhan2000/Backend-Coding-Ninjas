import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
const BookModel = mongoose.model('BookModel', bookSchema)
export default class BookRepository {
    async createBook(bookData) {
        try {
            const newBook = new BookModel(bookData);
            await newBook.save();
            return newBook;
        } catch (error) {
            console.error('Error creating book:', error);
            throw error;
        }
    }

    // async getOne(id) {
    //     try {
    //         const book = await BookModel.findById(id);
    //         if(book){
    //             return book;
    //         }else{

    //         }
    //     } catch (error) {
    //         console.error('Error retrieving book:', error);
    //         throw error;
    //     }
    // }
    async getOne(id) {
        const book = await BookModel.findById(id);
        return book;
    }
}

