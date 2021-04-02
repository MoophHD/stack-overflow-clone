const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const { upvote, downvote } = require("../controllers/vote.controller");

router.get("/upvote/:question_id/:answer_id?", auth, upvote);
router.get("/downvote/:question_id/:answer_id?", auth, downvote);

module.exports = router;
