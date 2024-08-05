import BookRepository from './book.repository.js';

export default class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    // Handle creation of a new book
    createBook = async (req, res) => {
        try {
            const newBook = req.body;
            const createdBook = await this.bookRepository.createBook(newBook);
            res.status(201).send(createdBook);
        } catch (error) {
            res.status(500).send({ message: 'Failed to create book', error: error.message });
        }
    }

    // Handle retrieval of a book by ID
    // getOne = async (req, res) => {
    //     const { id } = req.params;
    //     const book = await this.bookRepository.getOne(id);
    //     if (book) {
    //         return res.status(200).send(book);
    //     } else {
    //         return res.status(404).send({ message: 'Book not found' });
    //     }
    // }

    getOne = async (req, res) => {
        const { bookId } = req.params;
        console.log(bookId);

        try {
            const book = await this.bookRepository.getOne(bookId);
            if (!book) {
                res.status(404).send("Book  not found.");
            } else {
                res.status(200).send(book);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to find book' });
        }
    }
}
