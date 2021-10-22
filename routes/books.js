const { Router } = require("express");
const bookController = require("../controllers/bookController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

router.get("/books", requireAuth, bookController.book_get);
router.post("/books", requireAuth, bookController.book_post);

module.exports = router;
