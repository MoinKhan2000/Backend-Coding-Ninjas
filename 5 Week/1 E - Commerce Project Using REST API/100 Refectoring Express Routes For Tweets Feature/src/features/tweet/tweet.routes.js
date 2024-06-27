import express from "express";
import { createTweet, getTweets } from "./tweet.controller";

const router = express.Router();

router.get('/', getTweets)
router.post('/', createTweet)

export default router;
