@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/makeRecipeList.js'])
<div class = "main-wrapper">
    <div class="recipe-search-bar">
        <form method="post" action="/api/SearchForRecipe" id="formElem">
            <div>Title</div>
            <input type="text" id="input-form-recipe-name" name="title">
            <button type="button" onclick="ShowSearchedRecipes(formElem)">Search JS</button>
        </form>
    </div>
    <div class="recipe-list">
       
    </div>
</div>
@endsection