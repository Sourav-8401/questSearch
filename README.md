# Quiz Application

This is a responsive Quiz Application built using React.js. The app dynamically renders various types of questions, including multiple-choice questions (MCQs) and other types like anagrams, with a filtering mechanism for users to focus on specific types of questions.

Deployed at: [questsearch.vercel.app](https://questsearch.vercel.app)

## Features

- **Filters**: Filter questions by type, such as MCQs, anagrams, etc., or reset to view all.
- **Dynamic Rendering**: Questions are dynamically fetched and rendered based on data.
- **Interactive MCQs**: Users can select answers for MCQs, and feedback (correct/incorrect) is visually displayed.
- **Customizable Options**: Each question is uniquely managed, allowing flexibility and isolation.
- **Responsive Design**: Fully responsive layout to ensure usability on all devices.

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sourav-8401/questSearch.git
   ```

2. Navigate to the project directory:

   ```bash
   cd questSearch
   ```

3. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

4. Install dependencies for the backend:

   ```bash
   cd ../backend
   npm install
   # or
   yarn install
   ```

5. Start the frontend development server:

   ```bash
   cd frontend
   npm start
   # or
   yarn start
   ```

6. Start the backend server:

   ```bash
   cd ../backend
   npm start
   # or
   yarn start
   ```

7. Open the app in your browser:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`


## Functionality

1. **Filters**:

   - `ANAGRAM`, `MCQ`, `READ_ALONG`, `CONTENT_ONLY`, `CONVERSATION`, and `RESET` filters.
   - Filters dynamically show the corresponding type of question.

2. **MCQs**:

   - Users can select an option.
   - Correct answers are highlighted in green; incorrect answers in red.

3. **Dynamic State Management**:

   - Each question maintains its own state using unique IDs (`data._id.$oid`).

## Future Enhancements

- Add a backend for question storage and retrieval.
- Implement user authentication and progress tracking.
- Expand question types and functionalities.
- Add animations for better user interaction.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: [sk4118251@gmail.com](mailto:sk4118251@gmail.com)
- **GitHub**: [sourav8401](https://github.com/Sourav-8401)

---

Happy Coding!

