function backPreviousPage() {
    window.history.back();
}

const parameters = new URL(location.href);
const id = parameters.searchParams.get("id");
const event = data.events.find((event) => event["_id"] == id);
const [year, month, day] = event.date.split("-");
const [yearCurrent, monthCurrent, dayCurrent] = data.currentDate.split("-")

let eventIsActive = new Date(year, month, day) > new Date(yearCurrent, monthCurrent, dayCurrent);
let classEventIsActive = eventIsActive ? "badge bg-primary" : "badge bg-danger";
let markDate = eventIsActive ? "date-active" : "date-inactive";
let eventConcurrence = event.estimate ? 'Estimate: ' : 'Assistance: ';

document.getElementById("event-detail").innerHTML = `
                    <div class="col-md-6 img-detail p-0">
                        <img src="${event.image}" class="img-card-detail"alt="Event-1">
                    </div>
                    <div class="col-md-6 detail p-0 d-flex justify-content-between flex-column">
                        <h1>${event.name}</h1>
                        <div class="px-md-4 px-2 d-flex gap-lg-5 gap-md-3 gap-2 flex-column ">
                            <div class="d-flex justify-content-between align-items-center">
                                <label class="${markDate}">Date: ${event.date}</label>
                                <p class="${classEventIsActive}">${eventIsActive ? "Available" : "Finished"}</p>
                            </div>
                            <p class="description">${event.description}</p>
                            <div class="row align-items-center text-center">
                                <label class="col-12 col-sm-6">
                                    Place:
                                    ${event.place}
                                </label>
                                <i class="fa-solid fa-map-location-dot fa-xl col-12 col-sm-6 py-4"
                                style="color:#913175; cursor:pointer"></i>
                            </div>
                            <div class="row align-items-center text-center">
                                <label class="col-6">Capacity: ${event.capacity}</label>
                                <label class="col-6">${eventConcurrence + (event?.estimate | event?.assistance)}</label>
                            </div>
                        </div>
                        <span class="price-detail">
                            Price $${event.price}
                            <i class="fa-solid fa-face-surprise ms-3"></i>
                        </span
                    </div>
                    `;