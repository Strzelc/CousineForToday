const RootURL = document.location.origin.concat('/');
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
    const ingredientAvaibleUnitsList = document.getElementById("ingredient-available-units-list");

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
            ingredientAvaibleUnitsList.replaceChildren();
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
                    this.dataset.selected = true;
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
/* function GetIngredientId() {
    const avaibleNamesList = document.getElementById('ingredient-available-names-list');
    const avaibleNamesListItems = avaibleNamesList.getElementsByTagName("li");
    let selectedItem;
    let oneExactNameCount = 0; //flag
    const name=GetIngredientName();

    if(StringsAreTheSame(IngredientSelected.textContent,name))
        return IngredientSelected.dataset.index;
    else {
        [...avaibleNamesListItems].forEach(avaibleNamesListItem => {
            if(StringsAreTheSame(avaibleNamesListItem.textContent,name)) {
                oneExactNameCount++;
                selectedItem = avaibleNamesListItem;
            }
             
        })
    }
    if(oneExactNameCount==1) 
        return selectedItem.dataset.index;
    else
        return null;
} */

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
            console.log("if");
            if(onlyOneItemMatch)
            {
                console.log("null???");
                return true;
            }
            else {
                console.log("onlyOneItemMatch=true");
                onlyOneItemMatch=true;
                matchingItem=avaibleNamesListItem;
            }
                
        }
    
    });
    if(inputNameIsAmbiguous)
        return null;

    if(onlyOneItemMatch)
        return {"id":matchingItem.dataset.index,"name":matchingItem.textContent};
    else
        return null;
}
/////////////////////////////////
//Validation
/////////////////////////////////
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
                return false;
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
        return false;
    }
    if (ingredienAmount < 0) {
        CreateValidationErrorMessageUnderHtmlElement(ingredientAmounHtmltInput, TranslatedErorMessages.negativeAmount);
        return false;
    }
    return true;
}

function ValidateIngredientId(ingredienId) {
    console.log("ingredienId: "+ingredienId);
    if(ingredienId == null) {
        //CreateValidationErrorMessageUnderHtmlElement(avaibleNamesList, TranslatedErorMessages.wrongIngredientId);
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
/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.CreateImgredientEmtry = CreateImgredientEmtry;
window.ShowList = ShowList;
window.GetIngredientAvaibleUnits = GetIngredientAvaibleUnits;
window.InputChanged = InputChanged;
window.AddIngriedient = AddIngriedient;
GetIngredientsNames();
//CreateValidationErrorMessageUnderHtmlElement(document.getElementById('ingredient-available-names-list'),TranslatedErorMessages.missingName);
