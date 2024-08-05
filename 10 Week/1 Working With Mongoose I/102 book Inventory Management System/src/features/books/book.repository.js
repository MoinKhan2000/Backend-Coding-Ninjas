// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------


    //filtering the books based on genre
    async listBooksByGenre(genre) {
        try {
            const books = await booksModel.find({ genre });
            return books;
        } catch (error) {
            throw new Error(`Could not list books by genre: ${error}`);
        }
    }


    //increasing the count of available books
    async updateBookAvailability(bookId, quantity) {

        try {
            const book = await booksModel.findById(bookId);
            if (!book) {
                throw new Error('Book not found');
            }

            // Calculate the new availableCopies
            const newAvailableCopies = book.availableCopies + quantity;

            // Ensure availableCopies is not less than 0
            if (newAvailableCopies < 0) {
                throw new Error('availableCopies cannot be less than 0');
            }

            book.availableCopies = newAvailableCopies;
            await book.save();
            return book;
        } catch (error) {
            throw new Error(`Could not update book availability: ${error.message}`);
        }
    }




    //deletion of book
    async deleteBookById(bookId) {
        try {
            const deletedBook = await booksModel.findByIdAndDelete(bookId);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return deletedBook;
        } catch (error) {
            throw new Error(`Could not delete book: ${error}`);
        }
    }

}