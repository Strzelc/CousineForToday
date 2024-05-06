@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/addIngredient.js'])
<div class = "main-wrapper">

    <form method="post" action="/api/SearchForRecipe" id="formElem">
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Avaiable Units:
            <fieldset name="avaiable_units">
                <input type="text" name="avaiable_unit1-name">
                <input type="text" name="avaiable_unit1-converion_rate">
            </fieldset>
            
        </div>
        <div>water:
            <input type="text" name="water">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        <div>Name:
            <input type="text" name="name">
        </div>
        
        <input type="text" name="default_unit">
        <input type="text" name="avaiable_units">
        <input type="text" name="water">
        <input type="text" name="naenergyme">
        <input type="text" name="protein">
        <input type="text" name="fat">
        <input type="text" name="carbohydrate">
        <input type="text" name="fiber">
        <input type="text" name="sugars">
        <input type="text" name="cink">
    </form>
</div>
@endsection