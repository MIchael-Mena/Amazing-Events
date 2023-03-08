const [yearCurrent, monthCurrent, dayCurrent] = data.currentDate.split("-");
const currentDate = new Date(yearCurrent, monthCurrent, dayCurrent);

const notFound = `
    <div class="col d-inline-flex justify-content-center" >
        <div class="card card-alt">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center pt-5">
                    <span class="price">No events found</span>
                </div>
            </div>
        </div>
    </div>
    `;

const card = (event) => `
                        <div class="col d-inline-flex justify-content-center" >
                            <div class="card card-alt">
                                <img src="${event.image}" class="card-img-top" alt="...">
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
    const [categoriesParam] = getCategoryParameter()
    if(categoriesParam.length === 0){
        return true;
    } else {
        return categoriesParam.includes(event.category);
    }
}

const getFinderParameter = () => {
    return new URLSearchParams(window.location.search).get("finder");
}
const findAnEvent = () => {
    const valueToFound = getFinderParameter();
    const eventFound = data.events.find(event => event.name.toLowerCase().includes(valueToFound.toLowerCase()))
    if(eventFound){
        return card(eventFound);
    }else{
        return notFound;
    }
}

const filerCards = (data, functionForCompare) => {
    return  `
                ${data.events.map(event => {
                    if( comparateDate(event, functionForCompare) && filterCategories(event) ){
                        return card(event)
                    }
                    return ""
                }
            ).join('')}
            `;
}

const showCard = (data, functionForCompare) => {
    let cardToSee = '';
    console.log(getFinderParameter())
    if(getFinderParameter()){
        cardToSee = findAnEvent();
    } else {
        cardToSee = filerCards(data, functionForCompare);
    }
    document.getElementById("events-container").innerHTML = cardToSee;
}