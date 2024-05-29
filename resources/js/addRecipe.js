const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');
let LoadingMessage = "Loading...";

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
    const ingredientUnitsList = document.getElementById("ingredient_units_list");
    
    const apiUrl = RootURL + "api/search-for-ingredient-avaible-units";
    //const apiUrl =  RootURL+"api/debug";
    console.log("JSONstringify");
    console.log(JSON.stringify({id:id}));
    fetch(URL = apiUrl, {
        body: (JSON.stringify({id:id})),
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
    const ingredientNamesList = document.getElementById("ingredients_names_list");
    console.log("FillIngredientsNameList");
    console.log(names);
    if (names != null)
        if (names.length != 0) {
            names.forEach(element => {
                const listElem = document.createElement("li");
                listElem.innerHTML = element.name;
                listElem.value = element.id;
                listElem.onclick = function () { GetIngredientAvaibleUnits(element.id); };
                ingredientNamesList.appendChild(listElem);
            });
        }
}

function FillIngredientUnitsList(units) {
    const ingredientUnitsList = document.getElementById("ingredient_units_list");
    //console.log(ingredientUnitsList.childNodes);
    //ingredientUnitsList.removeChild(ingredientUnitsList.childNodes);
    console.log("FillIngredientUnitsList");
    console.log(units);
    units=JSON.parse(units);
    console.log(units);
    if (units != null)
        if (units.length != 0) {
            units.forEach(element => {
                const listElem = document.createElement("li");
                listElem.textContent = element.name;
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
function CreateImgredientEmtry(name, unit, amount) {

    const ingredientEntry = document.createElement("li");
    ingredientEntry.classList.add("list-group-item");

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

function AddRecipe() {

}

function ShowList(list) {
    list.hidden = false;
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
window.GetIngredientAvaibleUnits  = GetIngredientAvaibleUnits;
GetIngredientsNames();
