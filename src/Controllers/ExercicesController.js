

// Check if the selected option is the correct one
const isCorrectAnswer = (selectedID, currentExercice) => {
    
    return selectedID === currentExercice.correctOption;
}

const hasMoreExercices = (currentExerciceIndex, exercices) => {
    return currentExerciceIndex < exercices.length - 1;
}


const hasMoreDifficulties = (difficulty, availableDifficulties) => {
    return availableDifficulties.indexOf(difficulty) < availableDifficulties.length - 1;
}

export { isCorrectAnswer}