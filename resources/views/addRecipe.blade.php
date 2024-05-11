@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/addRecipe.js'])
<div class = "main-wrapper">
    <form method="post" action="/api/add-recipe" id="formElem">
        <div>Title
        <input type="text" id="input-form-recipe-title" name="title">
        </div>
        <div>Preparation
            <input type="text" id="input-form-recipe-preparation" name="preparation">
        </div>
        <div>Ingredients
            <div>
                <input type="text" id ="input-form-recipe-ingredients-name">Name
                    <datalist id="datalist-form-recipe-ingredients-name-datalist">
                        
                    </datalist>
                </input>
                <input type="text" id ="input-form-recipe-ingredients-amount">Amount</input>
                <input type="text" id ="input-form-recipe-ingredients-units">Unit
                    <datalist id="datalist-form-recipe-ingredients-units-datalist">
                        
                    </datalist>
                </input>
            </div>
            <button type="button" onclick="AddIngredient()">add ingredient to recipe</button>
            <ul class="list-group" id="ingredients-list">
                <li class="list-group-item">jj</li>
            </div>
        </div>
        
        <button type="submit" onclick="AddRecipe(formElem)">add recipe</button>
    </form>
</div>
@endsection