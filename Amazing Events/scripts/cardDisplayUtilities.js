const [yearCurrent, monthCurrent, dayCurrent] = data.currentDate.split("-");
const currentDate = new Date(yearCurrent, monthCurrent, dayCurrent);

const notFound = `
    <div class="col d-inline-flex justify-content-center" >
        <div class="card card-alt">
            <div class="card-body text-center">
                <span class="not-found">No events found</span>
            </div>
        </div>
    </div>
    `;

const card = (event) => `
                        <div class="col d-inline-flex justify-content-center" >
                            <div class="card card-alt">
                                <div class="card-img">
                                    <img src="${event.image}" class="card-img-top" alt="...">                          
                                </div>
                                <div class="card-body">
                                    <!-- Eliminar flex y usar posiciones absolutas -->
                                    <div class="d-flex justify-content-between align-items-center pt-5">
                                        <span class="price">Price $${event.price}</span>
                                        <button type="button" class="btn btn-sm " onclick="showDetail('${event["_id"]}')">
                                            See more...
                                        </button>
                                    </div>
                                    <i class="fa-solid fa-circle-chevron-down fa-2x icon-card"></i>
                                    <p class="card-text description">
                                        ${event.description}
                                    </p>
                                    <div class="con-card-footer">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;

const comparateDate = (event, functionForCompare) => {
    let [year, month, day] = event.date.split("-");
    let eventDate = new Date(year, month, day);
    return functionForCompare(eventDate, currentDate)
}

const filterCategories = (event) => {
    const [categoriesParam] = getQuery()
    if(categoriesParam.length === 0){
        return true;
    } else {
        return categoriesParam.includes(event.category);
    }
}

const getFinderParameter = () => {
    return new URLSearchParams(window.location.search).get("find");
}
const findAnEvent = (event, valueToFound) => {
    if(valueToFound) {
        return event.name.toLowerCase().includes(valueToFound.toLowerCase());
    } else {
        return true;
    }
}


const filterCards = (data, functionForCompare) => {
    const valueToFound = getFinderParameter();
    return  `
                ${data.events.map(event => {
                    if( comparateDate(event, functionForCompare) 
                        && findAnEvent(event,valueToFound) 
                        && filterCategories(event) ){
                        return card(event)
                    }
                    return ""
                }
            ).join('')}
            `;
}

const showCard = (data, functionForCompare) => {
    let cardsToShow = '';
    cardsToShow = filterCards(data, functionForCompare);
    if(cardsToShow.trim() === ''){
        cardsToShow = notFound;
    }
    document.getElementById("events-container").innerHTML = cardsToShow;
}