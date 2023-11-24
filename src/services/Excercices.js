import exercices from '../Persistence/exercices/exercices.json';

const getExercicesByLevel = (level = 'easy') => {
    return exercices[level];
}

const getExercices =() =>{
    return exercices;
}

const getDifficulties = () => {
    return Object.keys(exercices);
}

export { getExercicesByLevel, getExercices, getDifficulties};