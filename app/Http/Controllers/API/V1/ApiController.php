<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Model\RecipeModelController;
use App\Http\Controllers\Model\IngredientModelController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ApiController extends Controller
{
    /////////////
    //Recipes
    /////////////
    public function GetAllRecipes()
    {
        $allRecipes = RecipeModelController::index(['id', 'title', 'ingredients', 'preparation', 'images_urls']);
        return response()->json($allRecipes);
    }
    public function SearchForRecipes(Request $request)
    {
        $recipes = RecipeModelController::search(title: $request->input('title'));
        return response()->json($recipes);
    }
    /////////////
    //Ingredients
    /////////////
    public function GetAllIngredientsNames()
    {
        $ingredientsNames = IngredientModelController::index(['name']);
        return response()->json($ingredientsNames);
    }
    public function SearchForIngredients(Request $request)
    {
        $ingredients = IngredientModelController::search(name: $request->input('name'));
        return response()->json($ingredients);
    }
    public function SearchForIngredientAvaibleUnits(Request $request)
    {
        if (!is_null($request->input('id'))) {
            $avaible_units = IngredientModelController::show(id: $request->input('id'),columns:['avaible_units']);
            return response()->json($avaible_units);
        }
    }
    public function CrateNewIngredient(Request $request)
    {
        /*
        TODO-
        if(!is_null($request->input('avaiable_units'))) {
            $avaibleUnits = $request->input('avaiable_units');
            foreach($avaibleUnits as $unit) {
                check if any unit property is wrong
            }
        }
        ciekawe czy da się zrobić aby każda zasada była zapisywana do jakieś listy a następnie sprawdzana w tej pętli...
*/
        if(IngredientModelController::create(
            name: is_null($request->input('name')) ? '*' : $request->input('name'),
            avaiable_units: is_null($request->input('avaiable_units')) ? ['*'] : $request->input('avaiable_units'),
            water: is_null($request->input('water')) ? 0 : $request->input('water'),
            energy: is_null($request->input('energy')) ? 0 : $request->input('energy'),
            protein: is_null($request->input('protein')) ? 0 : $request->input('protein'),
            fat: is_null($request->input('fat')) ? 0 : $request->input('fat'),
            carbohydrate: is_null($request->input('carbohydrate')) ? 0 : $request->input('carbohydrate'),
            fiber: is_null($request->input('fiber')) ? 0 : $request->input('fiber'),
            sugars: is_null($request->input('sugars')) ? 0 : $request->input('sugars'),
            cink: is_null($request->input('cink')) ? 0 : $request->input('cink')
        )=="OK") 
            return view('recipeList',['TopBarMessage'=>'Created new ingredient!']);
        }
    /////////////
    //Debug
    /////////////
    public function Debug(Request $request)
    {
        return response()->json($request->input());
    }
}
