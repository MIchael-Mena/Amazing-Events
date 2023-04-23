const eventIsFinished = (eventDate, currentDate) => {
    return currentDate > eventDate
}

const api = "https://mindhub-xj03.onrender.com/api/amazing";
fetch("./assets/amazing.json")
    .then(response => response.json())
    .then(data => showCard(data, eventIsFinished));
