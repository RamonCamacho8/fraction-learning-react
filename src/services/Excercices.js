import exercices from '../assets/exercices/exercices.json';

export function getExercicesByLevel(level = 'easy'){
    return exercices[level];
}
