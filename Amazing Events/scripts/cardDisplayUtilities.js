const [yearCurrent, monthCurrent, dayCurrent] = data.currentDate.split("-");
const currentDate = new Date(yearCurrent, monthCurrent, dayCurrent);

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

const showCard = (data, functionForCompare) => {
    document.getElementById("events-container").innerHTML = `
                    ${data.events.map(event => {
            if( comparateDate(event, functionForCompare) ){
                return card(event)
            }
            return ""
        }
    ).join('')}
                    `;
}