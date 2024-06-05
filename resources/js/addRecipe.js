const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');
let LoadingMessage = "Loading...";
let ListOptionWasSelected = false;
let SelectedNameDataIndex=null;
let SelectedUnitDataIndex=null;

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
                listElem.dataset.selected = false;
                listElem.onclick = function () { 
                    GetIngredientAvaibleUnits(name.id);
                    inputHTML.value = this.textContent;
                    document.getElementById("ingredient-unit-input").value = "";
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
    console.log("FillIngredientUnitsList");
    console.log(units);
    units = JSON.parse(units);
    console.log(units);
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
    let name = GetIngredientName();
    let unit = GetIngredientUnit();
    let amount = parseFloat(document.getElementById('ingredient-amount-input').textContent);
}

function GetIngredientName() {
    let inputName = document.getElementById('ingredient-name-input');
    let avaibleNamesList = document.getElementById('ingredient-available-names-list');
    
    const listItems = avaibleNamesList.getElementsByTagName("li");
    let oneExactNameExist = false; //flag
    [...listItems].forEach(item => {
        if(StringsAreSimilar(item.textContent,inputName)) {
            if(oneExactNameExist)
                return null;
            else
                oneExactNameExist = true;
        }
    })
    return (oneExactNameExist) ? inputName : null;
}

function GetIngredientUnit() {
    let inputUnit = document.getElementById('ingredient-unit-input');
    let avaibleUnitsList = document.getElementById('ingredient-available-units-list');
    
    const listItems = avaibleUnitsList.getElementsByTagName("li");
    let oneSimilarUnitExist = false; //flag
    [...listItems].forEach(item => {
        if(StringsAreSimilar(item.textContent,inputUnit)) {
            if(oneSimilarUnitExist)
                return null;
            else
                oneSimilarUnitExist = true;
        }
    })
    return (oneSimilarUnitExist) ? inputUnit : null;
}


function AddRecipe() {

}

function ShowList(listHTMLid) {
    const listHTML = document.getElementById(listHTMLid);
    listHTML.hidden = false;
}

function InputChanged(listHTMLid, inputHTMLid) {
    let listHTML = document.getElementById(listHTMLid);
    let inputHTML = document.getElementById(inputHTMLid);

    const listItems = listHTML.getElementsByTagName("li");
    [...listItems].forEach(item => {
        item.hidden = !StringsAreSimilar(item.textContent,inputHTML.value);
    })
} 

function StringsAreSimilar(string1, string2) {
    return ((string1.toLowerCase()).includes(string2.toLowerCase())) ? true : false;
}

function StringsAreTheSame(string1,string2) {
    return string1.toLowerCase() == string2.toLowerCase() ? true : false;
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
