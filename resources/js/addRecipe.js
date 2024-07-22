const RootURL = document.location.origin.concat('/');
//Html elements
const IngredientAvaibleUnitsList = document.getElementById("ingredient-available-units-list");

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
            IngredientAvaibleUnitsList.replaceChildren();
            FillIngredientUnitsList(data);
        })
}
/////////////////////////////////
//List filling
/////////////////////////////////
function FillIngredientsNameList(names) {
    const ingredientNamesList = document.getElementById("ingredient-available-names-list");
    const inputHTML = document.getElementById("ingredient-name-input");
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
                    DeselectAllListItems("ingredient-available-names-list");
                    this.dataset.selected = true;
                    IngredientNameSelected = this;
                    //console.log(IngredientSelected);
                };
                ingredientNamesList.appendChild(listElem);
            });
        }
}

function FillIngredientUnitsList(units) {
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
    let {name, id} = GetIngredientNameAndId() || {name:null, id:null};
    console.log("id: "+id);
    console.log("name: "+name);
    if (ValidateIngredientName(name) && ValidateIngredientUnit(unit) && ValidateIngredientAmount(amount)) {
        if(ValidateIngredientId(id))
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

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.appendChild(ingredientEntry);
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

function RemoveAllValidationErrorMessagesUnderHtmlElement(htmlElement) {
    htmlElement.removeChild(htmlElement.childNodes.getElementsByClassName("ERROR_MESSEGE_CLASS")); //TODO replace ERROR_MESSEGE_CLASS with valid error message class
}

function DeselectAllListItems(listName) {
    const list = document.getElementById(listName);
    const avaibleNamesListItems = list.getElementsByTagName("li");
    [...avaibleNamesListItems].forEach(avaibleNamesListItem => {
        avaibleNamesListItem.dataset.selected=false;
    })
}
/////////////////////////////////
//Data retrieval from Html elements
/////////////////////////////////
function GetIngredientAmount() {
    let amount = parseFloat(document.getElementById('ingredient-amount-input').value);
    return amount;
}

function GetIngredientUnit() {
    let unit = document.getElementById('ingredient-unit-input').value;
    return unit;
}
/**
 * Retrieves ingredient name and id. If unsuccessful returns null.
 * @returns name of ingredient and its id. Format: dict {"name": name, "id": id}
 */
function GetIngredientNameAndId() { 
   if(IngredientNameSelected!=null)
        return {"id":IngredientNameSelected.dataset.index,"name":IngredientNameSelected.textContent};

   const avaibleNamesList = document.getElementById('ingredient-available-names-list');
   const avaibleNamesListItems = avaibleNamesList.getElementsByTagName("li");
   const ingredientNameFromInput = document.getElementById('ingredient-name-input').value;

   let onlyOneItemMatch=false;
   let matchingItem=null;
   let inputNameIsAmbiguous = [...avaibleNamesListItems].some(avaibleNamesListItem => {
        if(StringsAreTheSame(avaibleNamesListItem.textContent,ingredientNameFromInput)) {
            if(onlyOneItemMatch)
            {
                return true;
            }
            else {
                onlyOneItemMatch=true;
                matchingItem=avaibleNamesListItem;
            }
                
        }
    
    });
    if(inputNameIsAmbiguous)
        return null;

    if(onlyOneItemMatch)
        return {"id":matchingItem.dataset.index,"name":matchingItem.textContent};
    
    return null;
}
/////////////////////////////////
//Validation
/////////////////////////////////
/**
 * 
 * @param {string} ingredientName 
 * @returns 
 */
function ValidateIngredientName(ingredientName) {
    console.log('name '+ingredientName);
    console.log('name validation');
    const avaibleNamesList = document.getElementById('ingredient-available-names-list');
    const ingredientNameFromInput = document.getElementById('ingredient-name-input').value;

    if(ingredientNameFromInput=='')
    {
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList,TranslatedErorMessages.missingName);
        return false;
    }

    if(IngredientNameSelected!=null) {
        if(IngredientNameSelected.textContent==ingredientName) 
            return true;
    }

    const avaibleNamesListItems = avaibleNamesList.getElementsByTagName("li");
    let onlyOneItemMatch = false;
    let inputNameIsAmbiguous = [...avaibleNamesListItems].some(avaibleNamesListItem => {
        if(StringsAreTheSame(avaibleNamesListItem.textContent,ingredientNameFromInput)) {
            if(onlyOneItemMatch) { 
                return true;
            }
            else
                onlyOneItemMatch=true;
        }
            
    })

    if(inputNameIsAmbiguous) {
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList,TranslatedErorMessages.ambiguousName);
        return false;
    }
        

    if(!onlyOneItemMatch) {
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList,TranslatedErorMessages.noMatchingName);
        return false;
    }

    if(ingredientName==null) { //if dont know why name hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList,TranslatedErorMessages.default);
        return false;
    }

    return true;

}

function ValidateIngredientUnit(ingredientUnit) {
    const ingredientUnitFromInput = document.getElementById('ingredient-unit-input').value;
    if (ingredientUnitFromInput == '') {
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

    if(inputUnitIsAmbiguous) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.ambiguousUnit);
        return false;
    }

    if(!oneExactUnitExist) {
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList, TranslatedErorMessages.noMatchingUnit);
        return false;
    }

    if(ingredientUnit==null) { //if dont know why unit hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(IngredientAvaibleUnitsList,TranslatedErorMessages.default);
        return false;
    }

    return true;
}

function ValidateIngredientAmount(ingredienAmount) {
    let ingredientAmounHtmltInput = document.getElementById('ingredient-amount-input');
    if (ingredientAmounHtmltInput == null) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput, TranslatedErorMessages.missingAmount);
        return false;
    }
    if (ingredienAmount < 0) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput, TranslatedErorMessages.negativeAmount);
        return false;
    }

    if(ingredienAmount==null) { //if dont know why anount hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput,TranslatedErorMessages.default);
        return false;
    }

    return true;
}

function ValidateIngredientId(ingredienId) {
    const avaibleNamesList = document.getElementById('ingredient-available-names-list');
    if(ingredienId==null) { //if dont know why id hasnt been retrieved
        CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList,TranslatedErorMessages.default);
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
    IngredientNameSelected=null;
    RevealListItemsWithThisTextContext(listHTML, inputHTML.value);
    DeselectAllListItems(listHTML.id);
}

function StringsAreSimilar(string1, string2) {
    return ((string1.toLowerCase()).includes(string2.toLowerCase())) ? true : false;
}

function StringsAreTheSame(string1, string2) {
    return string1.toLowerCase() == string2.toLowerCase() ? true : false;
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

/////////////////////////////////
//Misc
/////////////////////////////////
function foo() {
    
}

function Dummy(data, id) {
    console.log("Dummy");
    console.log(document.getElementById(id));
    console.log(document.getElementById(data));
}
/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.CreateImgredientEmtry = CreateImgredientEmtry;
window.ShowList = ShowList;
window.GetIngredientAvaibleUnits = GetIngredientAvaibleUnits;
window.InputChanged = InputChanged;
window.AddIngriedient = AddIngriedient;
GetIngredientsNames();
