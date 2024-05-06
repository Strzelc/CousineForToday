<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Model\RecipeModelController;
use App\Http\Controllers\Model\IngredientModelController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ApiController extends Controller
{
    public function GetAllRecipes() {
        $allRecipes= RecipeModelController::index(['id','title','ingredients','preparation','images_urls']);
        return response()->json($allRecipes);
    }
    public function SearchForRecipes(Request $request) {
        $recipes = RecipeModelController::search(title:$request->input('title'));
        return response()->json($recipes);
    }
    public function GetAllIngredientsNames() {
        $ingredientsNames = IngredientModelController::index(['name']);
        return response()->json($ingredientsNames);
    }
    public function SearchForIngredients(Request $request) {
        $ingredients = IngredientModelController::search(name:$request->input('name'));
        return response()->json($ingredients);
    }
    public function SearchForIngredientAvaibleUnits(Request $request) {
        $ingredients = IngredientModelController::search(name:$request->input('name'));
        $ingredients = $ingredients->avaible_units;
        return response()->json($ingredients);
    }
}
