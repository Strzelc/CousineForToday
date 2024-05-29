@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/updateIngredient.js'])
<div class = "main-wrapper">
<form action="/api/crate-new-ingredient" method="post" id="main-form">
        <div>Name:
            <input type="text" name="name">
        </div>
        <div id="all-units">Avaiable Units:
            <div name="unit-div">
                <input type="text" name="name" value="gram">
                <input type="number" name="conversion_rate" step="0.000001" value="1">
            </div>
        </div>
        <button type="button" onclick="AddUnitToForm()">Add another unit</button>
        <p>Nutritions [Grams]</p>
        <div>water:
            <input type="number" name="water" step="0.000001">
        </div>
        <div>energy:
            <input type="number" name="energy" step="0.000001">
        </div>
        <div>protein:
            <input type="number" name="protein" step="0.000001">
        </div>
        <div>fat:
            <input type="number" name="fat" step="0.000001">
        </div>
        <div>Carbohydrate:
            <input type="number" name="carbohydrate" step="0.000001">
        </div>
        <div>Fiber:
            <input type="number" name="fiber" step="0.000001"> 
        </div>
        <div>Sugars:
            <input type="number" name="sugars" step="0.000001">
        </div>
        <div>Cink:
            <input type="number" name="cink" step="0.000001">
        </div>
        <input type="submit" onclick="OrderUnitsPropertiesNames()" value="Add ingredient">
        </form>     
</div>
@endsection