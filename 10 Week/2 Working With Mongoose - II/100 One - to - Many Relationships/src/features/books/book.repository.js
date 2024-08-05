// No need to change prewritten code

// -----------pre-written code starts--------------------

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import { errorMonitor } from 'form-data';

// creating model from schema.
const BookModel = mongoose.model('Book', bookSchema);
// creating model for review.
const ReviewModel = mongoose.model('Review', reviewSchema);

export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }


    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    //------------------pre-written code ends--------------------------

    // adding review to a particular book
    async addReviewToBook(bookId, text, rating) {
        try {
            // 1. Check if the book exists
            const bookToUpdate = await BookModel.findById(bookId);
            if (!bookToUpdate) {
                throw new Error('Book not found');
            }

            // 2. Create and save the new review
            const newReview = new ReviewModel({
                book: bookId,
                text: text,
                rating: rating
            });
            await newReview.save();

            // 3. Associate the review with the book
            bookToUpdate.reviews.push(newReview._id);
            await bookToUpdate.save();
            return newReview;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to add review');
        }
    }


}