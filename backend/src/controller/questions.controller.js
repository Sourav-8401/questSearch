import { Question } from "../model/question.model.js";

// Controller function to provide search suggestions based on user input
const showSuggestion = async (req, res) => {
    const { search } = req.query; 

    // Validate that the search query is provided and not empty
    if (!search || search.trim() === "") {
        return res.status(400).json({
            message: "Search query is required",
        });
    }

    try {
        // Only select the 'title' field to minimize data sent over the network
        const queryRes = await Question.find(
            { title: { $regex: search, $options: "i" } }, 
            { title: 1 }
        ).limit(7); // Limit the number of suggestions to 7

        // Check if any results were found
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

// Controller function to search for question titles based on user input and return results
const searchTitles = async (req, res) => {
    const { search, limits } = req.query; 

    if (!search || search.trim() === "") {
        return res.status(400).json({
            message: "Search query is required",
        });
    }

    try {
        const limitNumber = Number(limits) || 10;

        const queryRes = await Question.find(
            { title: { $regex: search, $options: "i" } } // Case-insensitive regex search
        ).limit(limitNumber); // Limit the number of results

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