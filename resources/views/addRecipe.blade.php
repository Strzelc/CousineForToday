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
                <input onclick="ShowList(ingredients_names_list)" oninput="InputChanged(ingredients_names_list,this)"/>
                <ul id="ingredients_names_list" hidden>

                </ul>

                <input onclick="ShowList(ingredient_units_list)" oninput="InputChanged(ingredient_units_list,this)" />
                <ul id="ingredient_units_list"  hidden>
                    
                </ul>
                <input type="number" name="amount" step="0.000001"/>
            </div>
            <button type="button" onclick="CreateImgredientEmtry()" >add ingredient to recipe</button>
            <ul class="list-group" id="ingredients-list">
                <li class="list-group-item">jj</li>
        </div>

        <button type="submit">add recipe</button>
    </form>
</div>
@endsection