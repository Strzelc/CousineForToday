const RootURL = document.location.origin.concat('/');
const IngredientsList = document.getElementById('ingredients-list');  
let LoadingMessage="Loading...";

function ShowUserMistake() {

}

function ValidateIngedientEntry(name, unit,amount) {

    return true;
}

function GetIngredientsNames() {
    const apiUrl =  RootURL+"api/AllIngredientsNames";

    fetch(apiUrl)

    .then((response) => {
        return (response.ok) ? response.json() : null
    })

    .then((data) => {
        FillIngredientsNameList(data);
    })
}

function GetIngredientAvaibleUnits() {
    const apiUrl =  RootURL+"api/SearchForIngredientAvaibleUnits";
    const selectedName = '{"name":"'+IngredientsList.value.toString()+'"}';

    fetch(URL=apiUrl, {
        body:JSON.parse(selectedName),
        headers: {
        'Content-type':  'application/json'
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

function FillIngredientsNameList(names) {
    const ingredientNamesList = document.getElementById("datalist-form-recipe-ingredients-name-datalist");
    if(units!=null)
        if(units.length!=0) {
            names.forEach(element => {
                const option =  document.createElement("option");
                option.textContent = element.name;
                ingredientNamesList.appendChild(option);
            });
        }
}

function FillIngredientUnitsList(units) {
    const ingredientUnitsList = document.getElementById("datalist-form-recipe-ingredients-units-datalist");
    
    if(units!=null)
        if(units.length!=0) {
            units.forEach(element => {
                const option =  document.createElement("option");
                option.textContent = element.name;
                ingredientUnitsList.appendChild(option);
            });
        }
}

function CreateImgredientEmtry(name, unit, amount) {
    
    const ingredientEntry = document.createElement("li");
    ingredientEntry.classList.add("list-group-item"); 

    const  ingredientEntryTitle = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryTitle.textContent=name;
    ingredientEntry.appendChild(ingredientEntryTitle);

    const  ingredientEntryUnit = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryUnit.textContent=unit;
    ingredientEntry.appendChild(ingredientEntryUnit);

    const  ingredientEntryAmount = document.createElement("h5");
    //ingredientEntryTitle.classList.add("recipe-card-title"); 
    ingredientEntryAmount.textContent=amount;
    ingredientEntry.appendChild(ingredientEntryAmount);

    if(ValidateIngedientEntry(ingredientEntryTitle.textContent,ingredientEntryUnit.textContent,ingredientEntryAmount.textContent))
        IngredientsList.appendChild(ingredientEntry);
    else {
        ShowUserMistake();
    }
}

function AddRecipe() {

}

function ShowLoadingMessage(language) {
    if(language==null || lanugage=="english") {
        LoadingMessage="Loading...";
    }
    return LoadingMessage;
}

/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.CreateImgredientEmtry= CreateImgredientEmtry;
GetIngredientsNames();
const ingredientUnitsList = document.getElementById("datalist-form-recipe-ingredients-units-datalist");
const option =  document.createElement("option");
option.textContent = LoadingMessage(document.documentElement.lang) ;
ingredientUnitsList.appendChild(option);
