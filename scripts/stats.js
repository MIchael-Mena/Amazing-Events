const api = "https://mindhub-xj03.onrender.com/api/amazing";
fetch("./assets/amazing.json")
    .then(response => response.json())
    .then(data => {
        showStats(data)
    })

const showStats = (data) => {
    const {events, currentDate} = data;
    const [pastPoAByCategory, upcomingPoAByCategory, eventHighestPoA,
        eventLowestPoA, eventLargestCapacity] = calculateStats(events, currentDate);
    const stats = document.getElementById('tableStats')
    stats.innerHTML = `
            <tr>
            <th colspan="3">Event Statistics</th>
            </tr>
            <tr class="title-tr">
                <td>Events with the highers percentage of attendance</td>
                <td>Events with the lowest percentage of attendance</td>
                <td>Events with larger capacity</td>
            </tr>
            <tr class="basic-tr">
                <td>${eventHighestPoA.name} (${eventHighestPoA.poa.toFixed(2)}%)</td>
                <td>${eventLowestPoA.name} (${eventLowestPoA.poa.toFixed(2)}%)</td>
                <td>${eventLargestCapacity.name} (${eventLargestCapacity.capacity})</td>      
            </tr>

            <tr>
                <th colspan="3">Upcoming events statistics by category</th>
            </tr>
            <tr class="title-tr">
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of attendance</td>
            </tr>
            ${showStatsForCategories(upcomingPoAByCategory)}
            
            <tr>
                <th colspan="3">Past events statistics by category</th>
            </tr>
            <tr class="title-tr">
                <td>Categories</td>
                <td>Revenues</td>
                <td>Percentage of attendance</td>
            </tr>
            ${showStatsForCategories(pastPoAByCategory)}
    `
}

const showStatsForCategories = (categories) => {
    let html = "";
    categories.forEach((value, category) => {
        const {revenues, capacity, assistance} = value;
        const poa = calculatePercentageOfAttendance(assistance, capacity);
        html += `
                    <tr class="basic-tr">
                        <td>${category}</td>
                        <td>$${revenues}</td>
                        <td>${poa.toFixed(2)}%</td>
                    </tr>
                `
    });
    return html;
/*    return Array.from(categories.keys()).map(category => {
        const {revenues, capacity, assistance} = categories.get(category);
        const poa = calculatePercentageOfAttendance(assistance, capacity);
        return `
                    <tr class="basic-tr">
                        <td>${category}</td>
                        <td>$${revenues}</td>
                        <td>${poa.toFixed(2)}%</td>
                    </tr>
                `
    }).join("")*/
}

const convertStringToDate = (date) => {
    const [year, month, day] = date.split("-");
    return new Date(year, month, day);
}

const calculatePercentageOfAttendance = (assistance, capacity) => {
    return (assistance * 100) / capacity;
}

const updateStatisticsByCategory = (event, pastPoAByCategory, assistance) => {
    if(pastPoAByCategory.has(event.category)){
        const attendance = pastPoAByCategory.get(event.category)
        pastPoAByCategory.set(event.category, {
            assistance: attendance.assistance + assistance,
            capacity: attendance.capacity + event.capacity,
            revenues: attendance.revenues + (assistance * event.price)
        });
    } else {
        pastPoAByCategory.set(event.category, {
            assistance,
            capacity: event.capacity,
            revenues: assistance * event.price});
    }
}

const calculateStats = (events, currenDateString) => {
    // PoA = Percentage of attendance
    let eventHighestPoA = null;
    let eventLowestPoA = null;
    let eventLargestCapacity = null;
    const pastPoAByCategory = new Map();
    const upcomingPoAByCategory = new Map();
    const currentDate = convertStringToDate(currenDateString);
    events.forEach(event => {
        let assistance = event?.assistance | event?.estimate;
        let eventDate = convertStringToDate(event.date);
        if( eventDate < currentDate ){
            eventHighestPoA = comparePoA(eventHighestPoA, event, poaIsHigher);
            eventLowestPoA = comparePoA(eventLowestPoA, event, poaIsLower);
            eventLargestCapacity = compareCapacity(eventLargestCapacity, event);
            updateStatisticsByCategory(event, pastPoAByCategory, assistance);
        } else if( eventDate > currentDate ){
            updateStatisticsByCategory(event, upcomingPoAByCategory, assistance);
        }
    });
    return [pastPoAByCategory, upcomingPoAByCategory, eventHighestPoA, eventLowestPoA, eventLargestCapacity];
}

const compareCapacity = (eventHighestCapacity, currentEvent) => {
    if(eventHighestCapacity === null){
        return currentEvent
    } else {
        return eventHighestCapacity.capacity > currentEvent.capacity ? eventHighestCapacity : currentEvent;
    }
}

const poaIsLower = (poaCurrent, poaToVerify) => {
    return poaCurrent < poaToVerify;
}

const poaIsHigher = (poaCurrent, poaToVerify) => {
    return poaCurrent > poaToVerify;
}

const comparePoA = (eventHighestPoA, currentEvent, condition) => {
    let currentAssistance = currentEvent?.assistance | currentEvent?.estimate;
    if(eventHighestPoA === null){
        return {...currentEvent,
            poa: calculatePercentageOfAttendance(currentAssistance, currentEvent.capacity)}
    } else {
        let highestAssistance = eventHighestPoA?.assistance | eventHighestPoA?.estimate;
        let highestPoA = calculatePercentageOfAttendance(highestAssistance, eventHighestPoA.capacity);
        let currentPoA = calculatePercentageOfAttendance(currentAssistance, currentEvent.capacity);
        return condition(highestPoA, currentPoA) ? eventHighestPoA : {...currentEvent, poa: currentPoA}
    }
}