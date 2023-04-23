const inputCheckboxes = (id, value) =>`
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" value="${value}"
                               id="${id}" name="category" >
                        <label class="form-check-label" for="${id}">
                            ${value}
                        </label>
                    </div>
                    `;

const showCategories = () =>{
                    document.getElementById("event-category").innerHTML = `
                    ${data.categories.map(category => 
                    // replace(/\s+/g, '') remuevo los espacios en blanco para el id
                        inputCheckboxes(category.replace(/\s+/g, ''), category) 
                    ).join('')}
                    `;
}
const setupQuery = ()=> {
    const categories = document.getElementsByName("category");
    categories.forEach(category => {
        category.addEventListener('change', () => {
            const categoryValue = category.value;
            let [currentCategoriesInQuery, currentQuery] = getQuery();
            if(currentCategoriesInQuery.length === 0) {
                addAllCategoriesToQuery(categoryValue, currentQuery);
            }else if(!currentCategoriesInQuery.includes(categoryValue) && category.checked) {
                addCategoryToQuery(currentCategoriesInQuery, currentQuery, categoryValue);
            } else if(currentCategoriesInQuery.includes(categoryValue) && !category.checked) {
                removeCategoryFromQuery(currentCategoriesInQuery, currentQuery, categoryValue);
            }
            window.location.href = window.location.pathname + "?" + currentQuery.toString();
        });
    });
}

const markCategories = () => {
    const [currentCategoriesInQuery] = getQuery();
    if(currentCategoriesInQuery.length === 0) {
        // Inicialmente, no hay categorías en la URL. Se marcan todas las categorías
        markCheckbox((category) => true);
    } else {
        // Se marcan las categorías que están en la query de la URL
        markCheckbox((category) => currentCategoriesInQuery.includes(category));
    }
}

function addAllCategoriesToQuery(categoryValue, currentQuery) {
    // Se ejecuta solo la primera vez que se selecciona una categoría
    // inicialmente se marcan todas las categorías menos la que se seleccionó
    data.categories.forEach((category) => {
        if(category !== categoryValue) {
            currentQuery.append('category', category);
        }
    });
}

function addCategoryToQuery(currentCategoriesInQuery, currentQuery, categoryValue) {
    if(currentCategoriesInQuery.length === 1 && currentCategoriesInQuery[0] === "none") {
        // Elimino el parámetro category=none
        currentQuery.delete('category');
    }
    currentQuery.append('category', categoryValue);
}

function removeCategoryFromQuery(currentCategoriesInQuery, currentQuery, categoryValue) {
    currentQuery.delete('category');
    if(currentCategoriesInQuery.length === 1) {
        currentQuery.append("category", "none");
    } else {
        currentCategoriesInQuery.forEach((category) => {
            if(category !== categoryValue) {
                currentQuery.append("category", category);
            }
        });
    }
}

function getQuery() {
    // Me devuelve un objeto con los parámetros y sus valores
    let currentQuery = new URLSearchParams(window.location.search);
    // Me devuelve un array con los valores de los parámetros (incluyendo los espacios en blanco)
    let currentCategoriesInQuery = currentQuery.getAll("category");
    return [currentCategoriesInQuery, currentQuery];
}



function markCheckbox(categoryInQueryIncludes) {
    const categories = document.getElementsByName("category");
    categories.forEach(category => {
        if(categoryInQueryIncludes(category.value)) {
            category.checked = true;
        }
    });
}

showCategories();
setupQuery();
markCategories();
