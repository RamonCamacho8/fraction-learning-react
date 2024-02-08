

// Check if the selected option is the correct one
const isCorrectAnswer = (selectedID, currentExercice) => {
    
    return selectedID === currentExercice.correctOption;
}

export { isCorrectAnswer}