<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\ApiModelController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Recipes
Route::get('/all-recipes', 'App\Http\Controllers\API\V1\ApiController@GetAllRecipes');
Route::post('/search-for-recipes','App\Http\Controllers\API\V1\ApiController@SearchForRecipes');
Route::post('/add-recipe','App\Http\Controllers\API\V1\ApiController@AddRecipe');
//Ingredients
Route::get('/all-ingredients-names', 'App\Http\Controllers\API\V1\ApiController@GetAllIngredientsNames');
Route::post('/search-for-ingredients','App\Http\Controllers\API\V1\ApiController@SearchForIngredients');
Route::post('/crate-new-ingredient','App\Http\Controllers\API\V1\ApiController@CrateNewIngredient');
Route::post('/search-for-ingredient-avaible-units','App\Http\Controllers\API\V1\ApiController@SearchForIngredientAvaibleUnits');
//Debug
Route::post('/debug','App\Http\Controllers\API\V1\ApiController@Debug');

