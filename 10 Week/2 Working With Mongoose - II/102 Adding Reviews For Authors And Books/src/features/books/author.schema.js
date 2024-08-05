import mongoose from 'mongoose';

// complete the review field, allowing authors to have associated reviews.

export const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            required: true,
        }
    ]
});
