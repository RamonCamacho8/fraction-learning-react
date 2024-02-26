export const stringNormalizer = (string) => {
    let tempString = string;
    if(tempString.match(/\d+/g)){
        tempString = tempString.replace(/\d+/g, '');
    }
    //The string not contains any special character but it does contains letters with accents
    if(tempString.match(/[^a-zA-Z\sáéíóúÁÉÍÓÚ]+/g)){
        tempString = tempString.replace(/[^a-zA-Z\sáéíóúÁÉÍÓÚ]+/g, '');
    }

    //The String only contains a space just between words
    if(tempString.match(/\s{2,}/g)){
        tempString = tempString.replace(/\s{2,}/g, ' ');
    }
    //If the first character is a space, remove it
    if(tempString.charAt(0) === ' '){
        tempString = tempString.slice(1);
    }

    return tempString;
}

export const nameNormalizer = (string) => {
    let tempString = string;
    tempString = tempString.toLowerCase();
    tempString = tempString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return tempString;
}

export const isDateValid = (actualDate, minDateString, maxDateString) => {

    const birthDate = new Date(actualDate);
    const minDate = new Date(minDateString);
    const maxDate = new Date(maxDateString);

    if(!minDate)
        return (birthDate < maxDate);
    else if(!maxDate)
        return (birthDate > minDate);
    else
        return (birthDate > minDate && birthDate < maxDate);

}

export const dateNormalizer = (dateString) => {

    let tempString = dateString;
    tempString = tempString.split('-').join('/');

    return tempString;
}
    