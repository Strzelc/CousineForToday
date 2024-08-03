const RootURL = document.location.origin.concat('/');
//Html elements
const IngredientAvaibleUnitsList = document.getElementById("ingredient-available-units-list");
const IngredientAvaibleNamesList = document.getElementById("ingredient-available-names-list");
const IngredientNameHtmlInput = document.getElementById("ingredient-name-input");
const IngredientUnitHtmlInput = document.getElementById("ingredient-unit-input");
const IngredientAmountHtmlInput = document.getElementById('ingredient-amount-input');
//Flags
let ListOptionWasSelected = false;
let SelectedNameDataIndex = null;
let SelectedUnitDataIndex = null;
let IngredientNameSelected = null;
let IngredientUnitSelected = null;

/////////////////////////////////
//API data retrieval
/////////////////////////////////
function GetIngredientsNames() {
    const apiUrl = RootURL + "api/all-ingredients-names";
    fetch(apiUrl)

        .then((response) => {
            return (response.ok) ? response.json() : null
        })

        .then((data) => {
            FillIngredientsNameList(data);
        })
}

function GetIngredientAvaibleUnits(id) {
    const apiUrl = RootURL + "api/search-for-ingredient-avaible-units";
    fetch(URL = apiUrl, {
        body: (JSON.stringify({ id: id })),
        headers: {
            'Content-type': 'application/json'
        },
        method: "POST"
    })

        .then((response) => {
            return (response.ok) ? response.json() : null
        })

        .then((data) => {
            FillIngredientUnitsList(data);
        })
}
/////////////////////////////////
//List filling
/////////////////////////////////
function FillIngredientsNameList(names) {
    IngredientAvaibleNamesList.replaceChildren();
    const ingredientNameHtmlInput = document.getElementById("ingredient-name-input");
    if (names != null)
        if (names.length != 0) {
            names.forEach(name => {
                const listElem = document.createElement("li");
                listElem.textContent = name.name;
                listElem.dataset.index = name.id;
                listElem.dataset.selected = false;
                listElem.onclick = function () {
                    GetIngredientAvaibleUnits(this.dataset.index);
                    ingredientNameHtmlInput.value = this.textContent;
                    InputChanged('ingredient-available-names-list', 'ingredient-name-input');
                    document.getElementById("ingredient-unit-input").value = "";
                    DeselectAllListItems(IngredientAvaibleUnitsList.id);
                    this.dataset.selected = true;
                    IngredientNameSelected = this;
                };
                IngredientAvaibleNamesList.appendChild(listElem);
            });
        }
}

function FillIngredientUnitsList(units) {
    IngredientAvaibleUnitsList.replaceChildren();
    const inputHTML = document.getElementById("ingredient-unit-input");
    units = JSON.parse(units);
    if (units != null)
        if (units.length != 0) {
            units.forEach(unit => {
                const listElem = document.createElement("li");
                listElem.textContent = unit.name;
                listElem.dataset.selected = false;
                listElem.onclick = function () {
                    inputHTML.value = unit.name;
                    this.dataset.selected = true;
                    //TODO - make list dissappear after click?
                };
                IngredientAvaibleUnitsList.appendChild(listElem);
            });
        }
        else {
            const listElem = document.createElement("li");
            listElem.textContent = ':(';
            IngredientAvaibleUnitsList.appendChild(listElem);
        }
}
/////////////////////////////////
//Page elements creation & property changes
/////////////////////////////////
function AddIngriedient() {
    let amount = GetIngredientAmount();
    let unit = GetIngredientUnit();
    let { name, id } = GetIngredientNameAndId() || { name: null, id: null };
    if (ValidateIngredientName(name) && ValidateIngredientUnit(unit) && ValidateIngredientAmount(amount)) {
        if (ValidateIngredientId(id))
            CreateImgredientEmtry(name, unit, amount, id);
    }
}

function CreateImgredientEmtry(name, unit, amount, id) {

    const ingredientEntry = document.createElement("li");
    ingredientEntry.classList.add("list-group-item");
    ingredientEntry.dataset.index = id;

    const ingredientEntryTitle = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryTitle.textContent = name;
    ingredientEntryTitle.name = "title";
    ingredientEntry.appendChild(ingredientEntryTitle);

    const ingredientEntryUnit = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryUnit.textContent = unit;
    ingredientEntryUnit.name = "unit";
    ingredientEntry.appendChild(ingredientEntryUnit);

    const ingredientEntryAmount = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryAmount.textContent = amount;
    ingredientEntryAmount.name = "amount";
    ingredientEntry.appendChild(ingredientEntryAmount);

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.appendChild(ingredientEntry);
}

function ShowList(listHTMLid) {
    const listHTML = document.getElementById(listHTMLid);
    listHTML.hidden = false;
    FillHtmlListBasedOnRelatedHtmlList(listHTML);
}
/**
 * Fill specified html list based on related html list.
 * @param {HTMLElement} listHTML 
 */
function FillHtmlListBasedOnRelatedHtmlList(listHTML) {
    if (listHTML == IngredientAvaibleUnitsList) {
        let { name, id } = GetIngredientNameAndId() || { name: null, id: null };
        if (ValidateIngredientName(name) && ValidateIngredientId(id))
            GetIngredientAvaibleUnits(id);
        else
            CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.invalidName)
    }
}

function CreateValidationErrorMessageUnderHtmlElement(htmlElement, message) {
    const messageHtmlElement = document.createElement('div');
    messageHtmlElement.classList.add("ERROR_MESSEGE_CLASS");
    messageHtmlElement.textContent = message;
    htmlElement.appendChild(messageHtmlElement);
}

function RemoveAllValidationErrorMessagesUnderHtmlElement(htmlElement) {
    htmlElement.removeChild(htmlElement.childNodes.getElementsByClassName("ERROR_MESSEGE_CLASS")); //TODO replace ERROR_MESSEGE_CLASS with valid error message class
}

function DeselectAllListItems(listName) {
    const list = document.getElementById(listName);
    const listItems = list.getElementsByTagName("li");
    [...listItems].forEach(listItem => {
        listItem.dataset.selected = false;
    })
}
/////////////////////////////////
//Data retrieval from Html elements
/////////////////////////////////
function GetRecipeTitle() {
    return document.getElementById("recipe-title-input").value;
}

function GetRecipePreparation() {
    return document.getElementById("recipe-preparation-input").value;
}
function GetIngredientAmount() {
    let amount = parseFloat(document.getElementById('ingredient-amount-input').value);
    return amount;
}

function GetIngredientUnit() {
    return IngredientUnitHtmlInput.value;
}
/**
 * Retrieves ingredient name and id. If unsuccessful returns null.
 * @returns name of ingredient and its id. Format: dict {"name": name, "id": id}
 */
function GetIngredientNameAndId() {
    if (IngredientNameSelected != null)
        return { "id": IngredientNameSelected.dataset.index, "name": IngredientNameSelected.textContent };

    const ingredientAvaibleNamesListItems = IngredientAvaibleNamesList.getElementsByTagName("li");

    let onlyOneItemMatch = false;
    let matchingItem = null;
    let inputNameIsAmbiguous = [...ingredientAvaibleNamesListItems].some(avaibleNamesListItem => {
        if (StringsAreTheSame(avaibleNamesListItem.textContent, IngredientNameHtmlInput.value)) {
            if (onlyOneItemMatch) {
                return true;
            }
            else {
                onlyOneItemMatch = true;
                matchingItem = avaibleNamesListItem;
            }

        }

    });
    if (inputNameIsAmbiguous)
        return null;

    if (onlyOneItemMatch)
        return { "id": matchingItem.dataset.index, "name": matchingItem.textContent };

    return null;
}
/////////////////////////////////
//Validation
/////////////////////////////////
function ValidateRecipeTitle(title) {
    const recipeTitleHtmlDiv = document.getElementById("recipe-title");
    if (title == null || title == '') {
        CreateValidationErrorMessageUnderHtmlElement(recipeTitleHtmlDiv, TranslatedErorMessages.missingTitle);
        return false;
    }
    return true;
}

function ValidateRecipePreparation(preparation) {
    const recipePreparationHtmlDiv = document.getElementById("recipe-title");
    if (preparation == null || preparation == '') {
        CreateValidationErrorMessageUnderHtmlElement(recipePreparationHtmlDiv, TranslatedErorMessages.missingPreparation);
        return false;
    }
    return true;
}
/**
 * 
 * @param {string} ingredientName 
 * @returns 
 */
function ValidateIngredientName(ingredientName) {
    if (IngredientNameHtmlInput.value == '') {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleNamesList, TranslatedErorMessages.missingName);
        return false;
    }

    if (IngredientNameSelected != null) {
        if (IngredientNameSelected.textContent == ingredientName)
            return true;
    }

    const ingredientAvaibleNamesListItems = IngredientAvaibleNamesList.getElementsByTagName("li");
    let onlyOneItemMatch = false;
    let inputNameIsAmbiguous = [...ingredientAvaibleNamesListItems].some(ingredientAvaibleNamesListItem => {
        if (StringsAreTheSame(ingredientAvaibleNamesListItem.textContent, IngredientNameHtmlInput.value)) {
            if (onlyOneItemMatch) {
                return true;
            }
            else
                onlyOneItemMatch = true;
        }

    })

    if (inputNameIsAmbiguous) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleNamesList, TranslatedErorMessages.ambiguousName);
        return false;
    }


    if (!onlyOneItemMatch) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleNamesList, TranslatedErorMessages.noMatchingName);
        return false;
    }

    if (ingredientName == null) { //if dont know why name hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleNamesList, TranslatedErorMessages.default);
        return false;
    }

    return true;

}

function ValidateIngredientUnit(ingredientUnit) {
    if (IngredientUnitHtmlInput.value == '') {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.missingUnit);
        return false;
    }
    const ingredientAvaibleUnitsListItems = IngredientAvaibleUnitsList.getElementsByTagName("li");

    let oneExactUnitExist = false; //flag
    let inputUnitIsAmbiguous = [...ingredientAvaibleUnitsListItems].some(ingredientAvaibleUnitsListItem => {
        if (StringsAreTheSame(ingredientAvaibleUnitsListItem.textContent, ingredientUnit)) {
            if (oneExactUnitExist) {

                return true;
            }
            else
                oneExactUnitExist = true;
        }
    })

    if (inputUnitIsAmbiguous) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.ambiguousUnit);
        return false;
    }

    if (!oneExactUnitExist) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.noMatchingUnit);
        return false;
    }

    if (ingredientUnit == null) { //if dont know why unit hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.default);
        return false;
    }

    return true;
}

function ValidateIngredientAmount(ingredienAmount) {
    console.log("ValidateIngredientAmount");
    console.log(ingredienAmount);
    let ingredienAmountFromHtmlInput = IngredientAmountHtmlInput.value;
    const ingredientAmountHtmlDiv = document.getElementById("ingredient-amount");
    if (ingredienAmountFromHtmlInput == null || ingredienAmountFromHtmlInput == '') {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmountHtmlDiv, TranslatedErorMessages.missingAmount);
        return false;
    }
    if (ingredienAmount < 0) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmountHtmlDiv, TranslatedErorMessages.negativeAmount);
        return false;
    }

    if (ingredienAmount == null) { //if dont know why anount hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmountHtmlDiv, TranslatedErorMessages.default);
        return false;
    }

    return true;
}

function ValidateIngredientId(ingredienId) {
    if (ingredienId == null) { //if dont know why id hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleNamesList, TranslatedErorMessages.default);
        return false;
    }

    return true;
}

/////////////////////////////////
//Utility functions
/////////////////////////////////
function InputChanged(listHTMLid, inputHTMLid) {
    let listHTML = document.getElementById(listHTMLid);
    let inputHTML = document.getElementById(inputHTMLid);
    IngredientNameSelected = null;
    RevealListItemsWithThisTextContext(listHTML, inputHTML.value);
    DeselectAllListItems(listHTML.id);
    if (listHTML == IngredientAvaibleNamesList) {
        IngredientAvaibleUnitsList.replaceChildren();
        IngredientUnitHtmlInput.value = '';
    }
}

function StringsAreSimilar(string1, string2) {
    if (string1 != null && string2 != null)
        return ((string1.toLowerCase()).includes(string2.toLowerCase())) ? true : false;
    else
        return string1 == string2 ? true : false;
}

function StringsAreTheSame(string1, string2) {
    if (string1 != null && string2 != null)
        return string1.toLowerCase() == string2.toLowerCase() ? true : false;
    else
        return string1 == string2 ? true : false;
}

function RevealListItemsWithThisTextContext(listHTML, text) {
    const listItems = listHTML.getElementsByTagName("li");
    [...listItems].forEach(item => {
        (StringsAreSimilar(item.textContent, text)) ? item.hidden = false : item.hidden = true;
    })
}



/* function SearchForListIndexesBySimilarName(list, name) {
    const listItems = list.getElementsByTagName("li");
    let foundItemsIndexes = [];
    [...listItems].forEach((item, index) => {
        if (StringsAreSimilar(item.textContent, name)) {
            foundItemsIndexes.push(index);
        }

    })
    return foundItemsIndexes;
} */

/* function SearchForListItemBySimilarName(list, name) {
    const listItems = list.getElementsByTagName("li");
    console.log("SearchForListItemBySimilarName");
    console.log(listItems);
    let foundItemsIndexes = [];
    [...listItems].forEach((item, index) => {
        console.log(item.textContent);
        console.log(name);
        if ((item.textContent.toLowerCase()).includes(name.toLowerCase())) {
            foundItemsIndexes.push(index);
            console.log(foundItemsIndexes);
        }

    })
    return foundItemsIndexes;
} */

    
function SearchForListItemByExactName(list, name) {
    const listItems = list.getElementsByTagName("li");
    let foundItemsIndexes = [];
    [...listItems].forEach((item, index) => {
        if (item.textContent = name)
            foundItemsIndexes.push(index);
    })
    return foundItemsIndexes;
}

function GetAllIngredients() {
    let ingredientList = document.getElementById("ingredients-list");
    let ingredientListItems = ingredientList.getElementsByTagName("li");
    let ingredientsJson = [];
    [...ingredientListItems].forEach(ingredientListItem => {
        ingredientsJson.push({
            id: ingredientListItem.dataset.index,
            title: ingredientListItem.children[0].textContent,
            unit: ingredientListItem.children[1].textContent,
            amount: ingredientListItem.children[2].textContent
        })
    });
    return ingredientsJson;
}

/////////////////////////////////
//Misc
/////////////////////////////////
function AddRecipe() { //unfisnihed
    let recipeIngredients = GetAllIngredients();
    let recipeTitle = GetRecipeTitle();
    let recipePreparation = GetRecipePreparation();
    if (ValidateRecipePreparation(recipePreparation) && ValidateRecipeTitle(recipeTitle)) {
        const apiUrl = RootURL + "api/add-recipe";
        document.createElement("div");
        fetch(URL = apiUrl, {
            body: (JSON.stringify({ title: recipeTitle, preparation: recipePreparation, ingredients: recipeIngredients })),
            headers: {
                'Content-type': 'application/json'
            },
            method: "POST"
        })

            .then((response) => {
                return (response.ok) ? response : null
            })

            .then((resp) => {
               
            })
    }
    else {
        //document.getElementById("recipe-save-button").textContent = 
        //CreateValidationErrorMessageUnderHtmlElement();
    }
}

/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.CreateImgredientEmtry = CreateImgredientEmtry;
window.ShowList = ShowList;
window.GetIngredientAvaibleUnits = GetIngredientAvaibleUnits;
window.InputChanged = InputChanged;
window.AddIngriedient = AddIngriedient;
window.AddRecipe = AddRecipe;
GetIngredientsNames();
window.GetAllIngredients = GetAllIngredients;
