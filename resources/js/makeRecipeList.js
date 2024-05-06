/////////////////////////////////
//Global constants
/////////////////////////////////
const ImgsRootPath = "../static/images/" //TODO - create imgs folder
const RecipeListDOM = document.querySelector('.recipe-list');
const RootURL = document.location.origin.concat('/');

/////////////////////////////////
//Utility functions
/////////////////////////////////
function CreateRecipeCard (cardId,cardImageSource,cardTitleText,cardTextText){
    const  cardLink = document.createElement("a");
    cardLink.href = RootURL+"recipe/"+cardId.toString();

    const card = document.createElement("div");
    card.classList.add("recipe-card");  
    cardLink.appendChild(card);
    
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

    return cardLink;
}

function CreateRecipeCards(cardsProperties) {
    if(cardsProperties==null) {
        const card = CreateRecipeCard(0,ImgsRootPath + "default.jpg","Title","Lorem ipsum");
        RecipeListDOM.appendChild(card);
    }
    else {
        cardsProperties.forEach(element => {
            const card = CreateRecipeCard(element.id, element.images_urls[0],element.title,element.preparation);
            RecipeListDOM.appendChild(card);
        });
    }
    RecipeListDOM.style.width=100*(RecipeListDOM.children.length)+'%';
}
/////////////////////////////////
//Functions that retrieve data from API. Can be called outside of script 
/////////////////////////////////
function ShowAllRecipes() {
    const APIurl = RootURL+"api/AllRecipes";
    fetch(APIurl)
    
    .then((response) => {
        return (response.ok) ? response.json() : null
    })

    .then((data) => {
        CreateRecipeCards(data);
    })
}

function ShowSearchedRecipes(form) { 
    const APIurl =  RootURL+"api/SearchForRecipes";
    const RecipeListDOM = document.querySelector('.recipe-list');
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
      RecipeListDOM.replaceChildren();
      if(data!=null)
        if(data.length!=0)
            CreateRecipeCards(data);
            else
            {
                const noProductNotification = document.createElement("p");
                noProductNotification.innerHTML+="No recipes found!";
                RecipeListDOM.appendChild(noProductNotification);
            }
    })
}

/////////////////////////////////
//Execution starts here
/////////////////////////////////
window.ShowSearchedRecipes = ShowSearchedRecipes;
window.ShowAllRecipes = ShowAllRecipes;
ShowAllRecipes();

