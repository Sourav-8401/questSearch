import { Router } from "express";
import { showSuggestion } from "../controller/questions.controller.js";
import { searchTitles } from "../controller/questions.controller.js";
const router = Router();

router.route("/suggest").get(showSuggestion);
router.route("/searchtitles").get(searchTitles);
export default router