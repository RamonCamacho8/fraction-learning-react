

// Check if the selected option is the correct one
const isCorrectAnswer = (selecteID, currentExercice) => {
    
    return selecteID === currentExercice.correctOption;
}

export { isCorrectAnswer}