// Data es una variable global, no es necesario pasarla como parámetro
const eventIsAvailable = (eventDate, currentDate) => {
    return currentDate < eventDate
}

showCard(data, eventIsAvailable)
