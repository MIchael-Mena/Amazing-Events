const showAllEvents = (eventDate, currentDate) => {
    return true
}

const api = "https://mindhub-xj03.onrender.com/api/amazing";
fetch("./assets/amazing.json")
    .then(response => response.json())
    .then(data => showCard(data, showAllEvents));
