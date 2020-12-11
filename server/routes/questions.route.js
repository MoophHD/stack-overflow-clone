const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  count,
  getPage,
  getQuestionById,
  createQuestion,
} = require("../controllers/question.controller");

router.get("/count", count);
router.get("/", getPage);
router.get("/:question_id", getQuestionById);
router.post("/", auth, createQuestion);

// router.get("/pick-answer/:question_id/:answer_id", auth, async (req, res) => {
//   try {
//     const user = req.user.id;
//     const question = await Question.findById(req.params.question_id);
//     const answer = await Answer.findById(req.params.answer_id).populate({
//       path: "author",
//       select: "score",
//     });

//     if (question.author.toString() !== user) {
//       return res.status(401).json({ message: "Not author of the question" });
//     }

//     question.bestAnswer = answer.id;
//     await question.save();

//     answer.isBest = true;
//     await answer.save();

//     res.json({ answer });
//   } catch (e) {
//     res.status(500).json({ message: `Something went terribly wrong: ${e}` });
//   }
// });


module.exports = router;
