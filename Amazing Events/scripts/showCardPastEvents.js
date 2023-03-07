const eventIsFinished = (eventDate, currentDate) => {
    return currentDate > eventDate
}

showCard(data, eventIsFinished);