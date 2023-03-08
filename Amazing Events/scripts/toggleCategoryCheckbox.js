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
                    // replace(/\s+/g, '') remuevo los espacios en blanco
                        inputCheckboxes(category.replace(/\s+/g, ''), category) 
                    ).join('')}
                    `;
}
const setupQuery = ()=> {
    const categories = document.getElementsByName("category");
    categories.forEach(category => {
        category.addEventListener('change', () => {
            let [categoriesParam, parameters, categoryWithoutSpaces, categoryValue] = prepareParameters(category);
            if(categoriesParam.length === 0) {
                addAllCategoriesToQuery(categoryValue);
            }else if(!categoriesParam.includes(categoryValue) && category.checked) {
                addCategoryToQuery(categoryWithoutSpaces, categoriesParam, parameters);
            } else if(categoriesParam.includes(categoryValue) && !category.checked) {
                removeCategoryFromQuery(categoryWithoutSpaces, categoriesParam, parameters);
            }
        });
    });
}

const markCategories = () => {
    const [categoriesParam, params] = getCategoryParameter();
    if(categoriesParam.length === 0) {
        // Inicialmente, no hay categorías en la URL. Se marcan todas las categorías
        markCheckbox((category) => true);
    } else {
        // Se marcan las categorías que están en la query de la URL
        markCheckbox((category) => categoriesParam.includes(category));
    }
}


function prepareParameters(category) {
    const [categoriesParam, params] = getCategoryParameter();
    // Le agrega un + en los espacios en blanco, params es un objeto
    // agrego el & para que se pueda concatenar con el resto de los parámetros
    let parameters = '&'+params.toString();
    let categoryWithoutSpaces = category.value.replace(' ', '+');
    let categoryValue = category.value;
    return [categoriesParam, parameters, categoryWithoutSpaces, categoryValue];
}

function addAllCategoriesToQuery(categoryValue) {
    // Se ejecuta solo la primera vez que se selecciona una categoría
    // inicialmente se marcan todas las categorías
    let parameters = "";
    data.categories.forEach((category, index) => {
        if(category !== categoryValue) {
            parameters += "&category=" + category.replace(' ', '+');
        }
    });
    window.location.href = window.location.pathname + "?" + parameters;
}

function addCategoryToQuery(categoryWithoutSpaces, categoriesParam, parameters) {
    if(categoriesParam.length === 1 && categoriesParam[0] === "none") {
        parameters = "";
    }
    window.location.href = window.location.pathname + "?" + parameters + "&category=" + categoryWithoutSpaces;
}

function removeCategoryFromQuery(categoryWithoutSpaces, categoriesParam, parameters) {
    if(categoriesParam.length === 1) {
        parameters = "&category=none"
    } else {
        parameters = parameters.replace("&category=" + categoryWithoutSpaces, "");
    }
    window.location.href = window.location.pathname + "?" + parameters;
}

function getCategoryParameter() {
    const params = new URLSearchParams(window.location.search);
    // Me devuelve un array con los valores de los parámetros (incluyendo los espacios en blanco)
    const categoriesParam = params.getAll("category");
    return [categoriesParam, params];
}



function markCheckbox(condition) {
    const categories = document.getElementsByName("category");
    categories.forEach(category => {
        if(condition(category.value)) {
            category.checked = true;
        }
    });
}

showCategories();
setupQuery();
markCategories();
