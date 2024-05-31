const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');
let LoadingMessage = "Loading...";
let ListOptionWasSelected = false;

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

 

function InputChanged(listHTML,inputHTML) {
    
    let namesIndexes = SearchForListItemBySimilarName(listHTML,inputHTML.value)
    const listItem = listHTML.getElementsByTagName("li");
    if(namesIndexes.length > 0) {
        [...listItem].forEach((item,index) => {
            if(namesIndexes.includes(index))
                item.hidden = false;
            else
                item.hidden = true;
        })
    }
    else if(inputHTML.value==""){
        [...listItem].forEach(item => {
                item.hidden = false;
        })
    }
    else {
        [...listItem].forEach(item => {
            item.hidden = true;
        })
    }

}

function SearchForListItemBySimilarName(list,name) {
    const listItem = list.getElementsByTagName("li");
    console.log("SearchForListItemBySimilarName");
    console.log(listItem);
    let foundItemsIndexes =[];
    [...listItem].forEach((item,index) => {
        console.log(item.innerHTML);
        console.log(name);
        if((item.innerHTML).includes(name)) {
            foundItemsIndexes.push(index);
            console.log(foundItemsIndexes);
        }
           
    })
    return foundItemsIndexes;
}

function SearchForListItemByExactName(list,name) {
    const listItem = list.getElementsByTagName("li");
    let foundItemsIndexes =[];
    [...listItem].forEach((item,index) => {
        if(item.innerHTML=name)
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
window.InputChanged = InputChanged;
GetIngredientsNames();
