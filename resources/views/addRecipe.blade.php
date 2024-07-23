@extends("layouts.recipeLayout")
@section("mainContent")
@vite(['resources/js/addRecipe.js'])
<script>
    window.TranslatedErorMessages={
        ambiguousName:"{{__('validation.ambiguous',['attribute'=>__('validation.attributes.name')])}}",
        missingName:"{{__('validation.required',['attribute'=>__('validation.attributes.name')])}}",
        noMatchingName:"{{__('validation.match',['subject'=>__('validation.subjects.ingredient'),'attribute'=>__('validation.attributes.name')])}}",
        invalidName:"{{__('validation.invalid',['attribute'=>__('validation.attributes.name'),'curr_attribute'=>__('validation.attributes.unit'),'subject'=>__('validation.subjects.ingredient')])}}",
        ambiguousUnit:"{{__('validation.ambiguous',['attribute'=>__('validation.attributes.unit')])}}",
        missingUnit:"{{__('validation.required',['attribute'=>__('validation.attributes.unit')])}}",
        noMatchingUnit:"{{__('validation.match',['subject'=>__('validation.subjects.ingredient'),'attribute'=>__('validation.attributes.unit')])}}",
        missingAmount:"{{__('validation.required',['attribute'=>__('validation.attributes.amount')])}}",
        negativeAmount:"{{__('validation.min.numeric',['attribute'=>__('validation.attributes.amount'),'min'=>'0'])}}",
        missingPreparation:"{{__('validation.required',['attribute'=>__('validation.attributes.preparation')])}}",
        missingTitle:"{{__('validation.required',['attribute'=>__('validation.attributes.title')])}}",
        wrongIngredientId:"{{__('validation.technical',['attribute'=>__('validation.attributes.name')])}}",
        default:"{{__('validation.technical',['attribute'=>__('validation.attributes.cock')])}}",
        };
</script>
<div class="main-wrapper">
    <form method="post" action="/api/add-recipe" id="formElem">
        <div id="recipe-title">{{__('addRecipePage.title')}}
            <input type="text" id="recipe-title-input" name="title">
        </div>
        <div id="recipe-preparations">{{__('addRecipePage.preparation')}}
            <input type="text" id="recipe-preparation-input" name="preparation">
        </div>
        <div>{{__('addRecipePage.ingredients')}}
            <div>{{__('addRecipePage.add-ingredient')}}
                <div id="ingredient-name">
                    <input id="ingredient-name-input" onclick="ShowList('ingredient-available-names-list')" oninput="InputChanged('ingredient-available-names-list','ingredient-name-input')"/>
                    
                    <div></div>
                    <ul id="ingredient-available-names-list" hidden>

                    </ul>
                </div>
                <div id="ingredient-unit">
                    <input id="ingredient-unit-input" onclick="ShowList('ingredient-available-units-list')" oninput="InputChanged('ingredient-available-units-list','ingredient-unit-input')" />
                    <ul id="ingredient-available-units-list"  hidden>
                        
                    </ul>
                </div>
                <div id="ingredient-amount">
                    <input id="ingredient-amount-input" type="number" name="amount" step="0.000001"/>
                </div>
                <button type="button" onclick="AddIngriedient()">{{__('addRecipePage.add-ingredient-to-recipe')}}</button>
            </div>
            <ul class="list-group" id="ingredients-list">
                
            </ul>
        </div>
        <button type="button" onclick="AddRecipe()">{{__('addRecipePage.add-recipe')}}</button>
    </form>
</div>
@endsection