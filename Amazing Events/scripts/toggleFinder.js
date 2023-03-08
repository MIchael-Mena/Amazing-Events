

const addEventToInput = () => {
    const finder = document.getElementById("finderContainerLabel")
    const inputFinder = document.getElementById("inputFinder")
    finder.addEventListener("click", () => {
        setAnValueToFind()
    })
    inputFinder.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            setAnValueToFind()
        }
    });
}

const setAnValueToFind = () => {
    const finder = document.getElementById("inputFinder")
    const eventToFind = finder.value;
    const valueToFind = eventToFind.trim();
    window.location.href = window.location.pathname + "?" + "find=" + valueToFind;
}

const finderLabel = document.getElementById("finderContainerLabel");
const blurLabel = () => {
    finderLabel.style.boxShadow = "0 0.2rem 0 0.2rem #d90268";
}
const focusLabel = () => {
        finderLabel.style.boxShadow = "0 0 0 0.2rem #f9a826";
}

addEventToInput()