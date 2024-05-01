/////////////////////////////////
//Global constants
/////////////////////////////////
const ImgsRootPath = "../static/images/" //TODO - create imgs folder
const RecipeListDOM = document.querySelector('.recipe-list');

/////////////////////////////////
//Utility functions
/////////////////////////////////
function CreateRecipeCard (cardImageSource,cardTitleText,cardTextText){
    const card = document.createElement("div");
    card.classList.add("recipe-card");  
    
    const cardImage = document.createElement("img");
    cardImage.setAttribute("src",cardImageSource);
    cardImage.classList.add("recipe-card-image"); 
    card.appendChild(cardImage);

    const  cardTitle = document.createElement("h5");
    cardTitle.classList.add("recipe-card-title"); 
    cardTitle.textContent=cardTitleText;
    card.appendChild(cardTitle);

    const  cardText = document.createElement("p");
    cardText.classList.add("recipe-card-text"); 
    cardText.textContent=cardTextText;
    card.appendChild(cardText);

    return card;
}

function CreateRecipeCards(cardsProperties) {
    if(cardsProperties==null) {
        const card = CreateRecipeCard(ImgsRootPath + "default.jpg","Title","Lorem ipsum");
        RecipeListDOM.appendChild(card);
    }
    else {
        cardsProperties.forEach(element => {
            const card = CreateRecipeCard(element.images_urls[0],element.title,element.preparation);
            RecipeListDOM.appendChild(card);
        });
    }
    RecipeListDOM.style.width=100*(RecipeListDOM.children.length)+'%';
}
/////////////////////////////////
//Functions that retrieve data from API. Can be called outside from script 
/////////////////////////////////
function ShowSearchedRecipes(form) {
    const APIurl = "api/SearchForRecipes";
    const HTML_SearchFormElement = document.querySelector('.recipe-list');
    var formData=new FormData(form);

    fetch(URL=APIurl, {
    
    body:JSON.stringify(Object.fromEntries(formData.entries())),
    headers: {
    'Content-type':  'application/json'
    },
    method: "POST"
    })
    .then((response) => {
      return (response.ok) ? response.json() : null
    })
    .then((data) => {
      HTML_SearchFormElement.replaceChildren();
      if(data!=null)
        if(data.length!=0)
            CreateRecipeCards(data);
            else
            {
                const noProductNotification = document.createElement("p");
                noProductNotification.innerHTML+="No recipes found!";
                HTML_SearchFormElement.appendChild(noProductNotification);
            }
    })
}
function ShowAllRecipes() {
    const APIurl = "api/AllRecipes";
    fetch(APIurl)
    .then((response) => {
        return (response.ok) ? response.json() : null
    })
    .then((data) => {
        CreateRecipeCards(data);
    })
}
/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.ShowSearchedRecipes = ShowSearchedRecipes;
ShowAllRecipes();

