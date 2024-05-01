@extends("layouts.recipeLayout")
@section("content")
<div class = "main-wrapper">
    <div class="recipe-search-bar">
        <form method="post" action="/api/SearchForRecipe" id="formElem">
            <input type="text" id="input-form-recipe-name" name="title">
            <input type="text" id="input-form-recipe-preparation" name="title">

            <button type="button" onclick="ShowSearchedRecipes(formElem)">Search JS</button>
        </form>
        
    </div>
    <div class="recipe-list">
       
    </div>
</div>
@endsection