@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/addRecipe.js'])
<div class="main-wrapper">
    <form method="post" action="/api/add-recipe" id="formElem">
        <div>Title
            <input type="text" id="input-form-recipe-title" name="title">
        </div>
        <div>Preparation
            <input type="text" id="input-form-recipe-preparation" name="preparation">
        </div>
        <div>Ingredients
            <div>Add Ingredient
                <input id="ingredient-name-input" onclick="ShowList('ingredient-available-names-list')" oninput="InputChanged('ingredient-available-names-list','ingredient-name-input')"/>
                <ul id="ingredient-available-names-list" hidden>

                </ul>

                <input id="ingredient-unit-input" onclick="ShowList('ingredient-available-units-list')" oninput="InputChanged('ingredient-available-units-list','ingredient-unit-input')" />
                <ul id="ingredient-available-units-list"  hidden>
                    
                </ul>
                <input id="ingredient-amount-input" type="number" name="amount" step="0.000001"/>
                <button type="button" onclick="AddIngriedient()">add ingredient to recipe</button>
            </div>
            
            <ul class="list-group" id="ingredients-list">
                <li class="list-group-item">jj</li>
        </div>

        <button type="submit">add recipe</button>
    </form>
</div>
@endsection