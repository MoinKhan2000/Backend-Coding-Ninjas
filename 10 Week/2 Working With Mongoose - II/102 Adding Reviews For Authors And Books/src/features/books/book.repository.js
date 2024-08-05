// No need to change the pre-written code.

// Just implement addReviewToTarget function.

import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';
const { ObjectId } = mongoose.Types;

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

// creating model for author.
const authorsModel = mongoose.model('Author', authorSchema);

export default class BookRepository {
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    async addReviewToTarget(targetId, target, text, rating) {
        if (target !== 'Author' && target !== 'Book') {
            throw new Error('Invalid target type');
        }

        try {
            // Create the review object
            const newReview = new reviewModel({
                text,
                rating,
            });

            // Save the review
            const savedReview = await newReview.save();

            // Link the review to the appropriate target
            if (target === 'Author') {
                const author = await authorsModel.findById(targetId);
                if (!author) {
                    throw new Error('Author not found');
                }
                author.reviews.push(savedReview._id);
                await author.save();
            } else if (target === 'Book') {
                const book = await booksModel.findById(targetId);
                if (!book) {
                    throw new Error('Book not found');
                }
                book.reviews.push(savedReview._id);
                await book.save();
            }

            return savedReview;
        } catch (error) {
            console.error('Error adding review:', error);
            throw new Error('Failed to add review');
        }
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

    async createAuthor(authorData) {
        const author = new authorsModel(authorData);
        const savedAuthor = await author.save();
        return savedAuthor;
    }

    async addAuthorToBook(bookId, authorId) {
        const book = await booksModel.findById(bookId);
        const author = await authorsModel.findById(authorId);

        if (!book || !author) {
            throw new Error('Book or author not found');
        }
        book.authors.push(author._id);
        author.books.push(book._id);

        await book.save();
        await author.save();

        return { book, author };
    }

    async listAuthorsByBook(bookId) {
        const book = await booksModel.findById(bookId).populate('authors');
        if (!book) {
            throw new Error('Book not found');
        }
        return book.authors;
    }

    async listBooksByAuthor(authorId) {
        const author = await authorsModel.findById(authorId).populate('books');
        if (!author) {
            throw new Error('Author not found');
        }
        return author.books;
    }
}