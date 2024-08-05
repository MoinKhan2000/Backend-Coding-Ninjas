import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js';
import { reviewSchema } from './review.schema.js';
import { authorSchema } from './author.schema.js';

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

// creating model for review.
const reviewModel = mongoose.model('Review', reviewSchema);

// creating model for author
const authorsModel = mongoose.model('Author', authorSchema);

export default class BookRepository {
    // Create a new book
    async createBook(bookData) {
        console.log(bookData);
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // Add a review to a book
    async addReviewToBook(bookId, text, rating) {
        const reviewData = {
            text,
            rating,
            book: new mongoose.Types.ObjectId(bookId),
        };
        const review = new reviewModel(reviewData);
        const savedReview = await review.save();

        const book = await booksModel.findById(bookId);

        book.reviews.push(savedReview._id);
        await book.save();

        return savedReview;
    }

    // Get a book by ID
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // List books by genre
    async listBooksByGenre(genre) {
        const books = await booksModel.find({ genre });
        return books;
    }

    // Update book availability
    async updateBookAvailability(bookId, quantity) {
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    // Delete a book by ID
    async deleteBookById(bookId) {
        const deletedBook = await booksModel.findByIdAndRemove(bookId);
        return deletedBook;
    }

    // Create a new author
    async createAuthor(authorData) {
        const author = new authorsModel(authorData);
        const savedAuthor = await author.save();
        return savedAuthor;
    }

    // Add an author to a book
    async addAuthorToBook(bookId, authorId) {
        // Fetch the book by ID
        const book = await booksModel.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        // Check if the author exists
        const author = await authorsModel.findById(authorId);
        if (!author) {
            throw new Error('Author not found');
        }

        book.authors.push(author._id);
        await book.save();
        author.books.push(book._id);
        await author.save();
        return { book, author };
    }

    // List authors by book ID
    async listAuthorsByBook(bookId) {
        const book = await booksModel.findById(bookId).populate('authors');
        if (!book) {
            throw new Error('Book not found');
        }
        return book.authors;
    }

    // List books by author ID
    async listBooksByAuthor(authorId) {
        const books = await booksModel.find({ authors: authorId });
        return books;
    }
}
