const inputCheckboxes = (id, value) =>`
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" value="${value}"
                               id="${id}" name="category" >
                        <label class="form-check-label" for="${id}">
                            ${value}
                        </label>
                    </div>
                    `;

document.getElementById("event-category").innerHTML = `
                    ${data.categories.map(category => 
                        inputCheckboxes(category.replace(/\s+/g, ''), category) 
                    ).join('')}
                    `;

markAllCategories = () => {
    const categories = document.getElementsByName("category");
    categories.forEach(category => {
        category.checked = true;
    });
}
markAllCategories();