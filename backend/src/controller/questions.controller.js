import { Question } from "../model/question.model.js";

const showSuggestion = async (req, res) => {
    const { search } = req.query; 

    if (!search || search.trim() === "") {
        return res.status(400).json({
            message: "Search query is required",
        });
    }

    try {
        const queryRes = await Question.find(
            { title: { $regex: search, $options: "i" } },
            { title: 1 }
        ).limit(7);

        if (queryRes.length === 0) {
            return res.status(404).json({
                message: "No data found",
            });
        }

        return res.status(200).json({
            data: queryRes,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve data",
            error: error.message,
        });
    }
}

const searchTitles = async (req, res) => {
    const { search, limits } = req.query; 
    if (!search || search.trim() === "") {
        return res.status(400).json({
            message: "Search query is required",
        });
    }
    try {
        const queryRes = await Question.find(
            { title: { $regex: search, $options: "i" } },
        ).limit(Number(limits) || 10);

        if (queryRes.length === 0) {
            return res.status(404).json({
                message: "No data found",
            });
        }

        return res.status(200).json({
            data: queryRes,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve data",
            error: error.message,
        });
    }
}

export {
    showSuggestion,
    searchTitles
}