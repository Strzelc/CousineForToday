const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');
let LoadingMessage = "Loading...";
let ListOptionWasSelected = false;
let SelectedName=null;
let SelectedUnit=null;

/////////////////////////////////
//API data retrieval
/////////////////////////////////
function GetIngredientsNames() {
    const apiUrl = RootURL + "api/all-ingredients-names";
    console.log("1");
    fetch(apiUrl)

        .then((response) => {
            return (response.ok) ? response.json() : null
        })

        .then((data) => {
            console.log("GetIngredientsNames");
            console.log(data);
            FillIngredientsNameList(data);
        })
}

function GetIngredientAvaibleUnits(id) {
    console.log(id);
    const ingredientUnitsList = document.getElementById("ingredient-available-units-list");

    const apiUrl = RootURL + "api/search-for-ingredient-avaible-units";
    //const apiUrl =  RootURL+"api/debug";
    console.log("JSONstringify");
    console.log(JSON.stringify({ id: id }));
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
            console.log("GetIngredientAvaibleUnits");
            console.log(data);
            FillIngredientUnitsList(data);
        })
}
/////////////////////////////////
//List filling
/////////////////////////////////
function FillIngredientsNameList(names) {
    const ingredientNamesList = document.getElementById("ingredient-available-names-list");
    const inputHTML = document.getElementById("ingredient-name-input");
    console.log("FillIngredientsNameList");
    console.log(names);
    if (names != null)
        if (names.length != 0) {
            names.forEach(name => {
                const listElem = document.createElement("li");
                listElem.textContent = name.name;
                listElem.dataset.index = name.id;
                listElem.onclick = function () { 
                    GetIngredientAvaibleUnits(name.id);
                    inputHTML.value = this.textContent;
                    document.getElementById("ingredient-unit-input").value = "";
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
    console.log("FillIngredientUnitsList");
    console.log(units);
    units = JSON.parse(units);
    console.log(units);
    if (units != null)
        if (units.length != 0) {
            units.forEach(unit => {
                const listElem = document.createElement("li");
                listElem.textContent = unit.name;
                listElem.onclick = function () { 
                    inputHTML.value = unit.name;
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
//Site elements changes & creation
/////////////////////////////////
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

    if (ValidateIngedientEntry(ingredientEntryTitle.textContent, ingredientEntryUnit.textContent, ingredientEntryAmount.textContent))
        IngredientsList.appendChild(ingredientEntry);
    else {
        ShowUserMistake();
    }
}

function AddIngriedient() {
}

function GetIngredientName() {
    inputName = document.getElementById('ingredient-name-input');
    avaibleNamesList = document.getElementById('ingredient-available-names-list');
    listItems = avaibleNamesList.getElementsByTagName('li');
}

function AddRecipe() {

}

function ShowList(listHTMLid) {
    const listHTML = document.getElementById(listHTMLid);
    listHTML.hidden = false;
}

function InputChanged(listHTMLid, inputHTMLid) {
    listHTML = document.getElementById(listHTMLid);
    inputHTML = document.getElementById(inputHTMLid);
    let namesIndexes = SearchForListItemBySimilarName(listHTML, inputHTML.value)
    const listItems = listHTML.getElementsByTagName("li");
    if (namesIndexes.length > 0) {
        [...listItems].forEach((item, index) => {
            if (namesIndexes.includes(index))
                item.hidden = false;
            else
                item.hidden = true;
        })
    }
    else if (inputHTML.value == "") {
        [...listItems].forEach(item => {
            item.hidden = false;
        })
    }
    else {
        [...listItems].forEach(item => {
            item.hidden = true;
        })
    }

}

function SearchForListItemBySimilarName(list, name) {
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
}

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
//Validation
/////////////////////////////////
function ShowUserMistake(mistake) {

}

function ValidateIngedientEntry(name, unit, amount) {

    ShowUserMistake(mistake);
    return true;
}

function Dummy(data,id){
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
