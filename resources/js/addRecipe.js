const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');
let LoadingMessage = "Loading...";
let ListOptionWasSelected = false;
let SelectedNameDataIndex = null;
let SelectedUnitDataIndex = null;
let MessageToUser = "";

/////////////////////////////////
//API data retrieval
/////////////////////////////////
function GetIngredientsNames() {
    const apiUrl = RootURL + "api/all-ingredients-names";
    //console.log("1");
    fetch(apiUrl)

        .then((response) => {
            return (response.ok) ? response.json() : null
        })

        .then((data) => {
            //console.log("GetIngredientsNames");
            //console.log(data);
            FillIngredientsNameList(data);
        })
}

function GetIngredientAvaibleUnits(id) {
    //console.log(id);
    const ingredientUnitsList = document.getElementById("ingredient-available-units-list");

    const apiUrl = RootURL + "api/search-for-ingredient-avaible-units";
    //const apiUrl =  RootURL+"api/debug";
    //console.log("JSONstringify");
    //console.log(JSON.stringify({ id: id }));
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
            ingredientUnitsList.replaceChildren();
            //console.log("GetIngredientAvaibleUnits");
            //console.log(data);
            FillIngredientUnitsList(data);
        })
}
/////////////////////////////////
//List filling
/////////////////////////////////
function FillIngredientsNameList(names) {
    const ingredientNamesList = document.getElementById("ingredient-available-names-list");
    const inputHTML = document.getElementById("ingredient-name-input");
    //console.log("FillIngredientsNameList");
    //console.log(names);
    if (names != null)
        if (names.length != 0) {
            names.forEach(name => {
                const listElem = document.createElement("li");
                listElem.textContent = name.name;
                listElem.dataset.index = name.id;
                listElem.dataset.selected = false;
                listElem.onclick = function () {
                    GetIngredientAvaibleUnits(name.id);
                    inputHTML.value = this.textContent;
                    InputChanged('ingredient-available-names-list','ingredient-name-input');
                    document.getElementById("ingredient-unit-input").value = "";
                    DeselectAllListItems(document.getElementById("ingredient-available-names-list"));
                    listElem.dataset.selected = true;
                };
                ingredientNamesList.appendChild(listElem);
            });
        }
}

function FillIngredientUnitsList(units) {
    const ingredientUnitsList = document.getElementById("ingredient-available-units-list");
    const inputHTML = document.getElementById("ingredient-unit-input");
    //console.log(ingredientUnitsList.childNodes);
    //ingredientUnitsList.removeChild(ingredientUnitsList.childNodes);
    //console.log("FillIngredientUnitsList");
    //console.log(units);
    units = JSON.parse(units);
    //console.log(units);
    if (units != null)
        if (units.length != 0) {
            units.forEach(unit => {
                const listElem = document.createElement("li");
                listElem.textContent = unit.name;
                listElem.dataset.selected = false;
                listElem.onclick = function () {
                    inputHTML.value = unit.name;
                    listElem.dataset.selected = true;
                    //TODO - make list dissappear after click?
                };
                ingredientUnitsList.appendChild(listElem);
            });
        }
        else {
            const listElem = document.createElement("li");
            listElem.textContent = ':(';
            ingredientUnitsList.appendChild(listElem);
        }
}
/////////////////////////////////
//Page elements creation & property changes
/////////////////////////////////
function AddIngriedient() {
    let name = GetIngredientName();
    let unit = GetIngredientUnit();
    let amount = GetIngredientAmount();
    let id = GetIngredientId();
    if (ValidateIngredientName(name) && ValidateIngredientUnit() && ValidateIngredientAmount(amount) && ValidateIngredientId(id)) {
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
    ingredientEntry.appendChild(ingredientEntryTitle);

    const ingredientEntryUnit = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryUnit.textContent = unit;
    ingredientEntry.appendChild(ingredientEntryUnit);

    const ingredientEntryAmount = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryAmount.textContent = amount;
    ingredientEntry.appendChild(ingredientEntryAmount);

    IngredientsList.appendChild(ingredientEntry);
}

function ShowList(listHTMLid) {
    const listHTML = document.getElementById(listHTMLid);
    listHTML.hidden = false;
}

function CreateValidationErrorMessageUnderHtmlElement(htmlElement, message) {
    const messageHtmlElement = document.createElement('div');
    messageHtmlElement.textContent = message;
    htmlElement.appendChild(messageHtmlElement);
}

function DeselectAllListItems(list) {
    avaibleNamesListItems = list.getElementsByTagName("li");
    [...avaibleNamesListItems].forEach(avaibleNamesListItem => {
        if (StringsAreTheSame(avaibleNamesListItem.textContent, ingredientName)) {
            if (oneExactNameExist) {
                CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList, TranslatedErorMessages.ambiguousName);
                return false;
            }
            else
                oneExactNameExist = true;
        }
    })
}
/////////////////////////////////
//Data retrieval from Html elements
/////////////////////////////////
function GetIngredientId() {
    const avaibleNamesList = document.getElementById('ingredient-available-names-list');
    const avaibleNamesListItems = avaibleNamesList.getElementsByTagName("li");
    let selectedIndex;
    let oneExactNameExist = false; //flag
    [...avaibleNamesListItems].forEach(avaibleNamesListItem => {
        if(StringsAreTheSame(avaibleNamesListItem.textContent,  GetIngredientName())) {
            if(oneExactNameExist)
                oneExactNameExist=false;
            if (avaibleNamesListItem.dataset.selected == true) {
                return avaibleNamesListItem.dataset.index;
            }
        }
         
    })
}

function GetIngredientAmount() {
    let amount = parseFloat(document.getElementById('ingredient-amount-input').value);
    return amount;
}

function GetIngredientName() {
    let name = document.getElementById('ingredient-name-input').value;
    return name;
}

function GetIngredientUnit() {
    let unit = document.getElementById('ingredient-unit-input').value;
    return unit;
}
/////////////////////////////////
//Validation
/////////////////////////////////
function ValidateIngredientName(ingredientName) {
    const avaibleNamesList = document.getElementById('ingredient-available-names-list');
    if (ingredientName == null) {
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList, TranslatedErorMessages.missingName);
        return false;
    }
    const avaibleNamesListItems = avaibleNamesList.getElementsByTagName("li");
    let oneExactNameExist = false; //flag
    [...avaibleNamesListItems].forEach(avaibleNamesListItem => {
        if (StringsAreTheSame(avaibleNamesListItem.textContent, ingredientName)) {
            if (oneExactNameExist) {
                CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList, TranslatedErorMessages.ambiguousName);
                return false;
            }
            else
                oneExactNameExist = true;
        }
    })

    return oneExactNameExist;
}

function ValidateIngredientUnit(ingredientUnit) {
    let avaibleUnitsList = document.getElementById('ingredient-available-units-list');
    if (ingredientUnit == null) {
        CreateValidationErrorMessageUnderHtmlElement(avaibleUnitsList, TranslatedErorMessages.missingUnit);
        return false;
    }
    const avaibleUnitsListItems = avaibleUnitsList.getElementsByTagName("li");
    let oneExactUnitExist = false; //flag
    [...avaibleUnitsListItems].forEach(avaibleUnitsListItem => {
        if (StringsAreTheSame(avaibleUnitsListItem.textContent, ingredientUnit)) {
            if (oneExactUnitExist) {
                CreateValidationErrorMessageUnderHtmlElement(avaibleUnitsList, TranslatedErorMessages.ambiguousUnit);
                return null;
            }
            else
                oneExactUnitExist = true;
        }
    })

    return oneExactUnitExist;
}

function ValidateIngredientAmount(ingredienAmount) {
    let ingredientAmounHtmltInput = document.getElementById('ingredient-amount-input');
    if (ingredienAmount == null) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput, TranslatedErorMessages.missingAmount);
    }
    if (ingredienAmount < 0) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput, TranslatedErorMessages.negativeAmount);
    }
    return true;
}

function ValidateIngredientId(ingredienId) {
    if(ingredienId === null) {
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList, TranslatedErorMessages.wrongIngredientId);
        return false;
    }
    return true;
}

function ValidateIngedientEntry(name, unit, amount) {
    
    return true;
}
/////////////////////////////////
//Utility functions
/////////////////////////////////
function InputChanged(listHTMLid, inputHTMLid) {
    let listHTML = document.getElementById(listHTMLid);
    let inputHTML = document.getElementById(inputHTMLid);
    RevealListItemsWithSimilarTextContext(listHTML, inputHTML.value);
}

function StringsAreSimilar(string1, string2) {
    return ((string1.toLowerCase()).includes(string2.toLowerCase())) ? true : false;
}

function StringsAreTheSame(string1, string2) {
    return string1.toLowerCase() == string2.toLowerCase() ? true : false;
}

function RevealListItemsWithSimilarTextContext(listHTML, text) {
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

/////////////////////////////////
//Misc
/////////////////////////////////
function foo() {
    document.getElementById("costam").setCustomValidity("{{__('validation.accepted')}}");
}
function ShowMessageToUser() {
    alert(MessageToUser);
}
function Dummy(data, id) {
    console.log("Dummy");
    console.log(document.getElementById(id));
    console.log(document.getElementById(data));
}
/*
function ShowLoadingMessage(language) {
    if(language==null || lanugage=="english") {
        LoadingMessage="Loading...";
    }
    return LoadingMessage;
}
*/
/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.CreateImgredientEmtry = CreateImgredientEmtry;
window.ShowList = ShowList;
window.GetIngredientAvaibleUnits = GetIngredientAvaibleUnits;
window.InputChanged = InputChanged;
window.Dummy = Dummy;
GetIngredientsNames();
