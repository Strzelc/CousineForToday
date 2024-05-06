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
Route::get('/AllRecipes', 'App\Http\Controllers\API\V1\ApiController@GetAllRecipes');
Route::post('/SearchForRecipes','App\Http\Controllers\API\V1\ApiController@SearchForRecipes');
//Ingredients
Route::get('/AllIngredientsNames', 'App\Http\Controllers\API\V1\ApiController@GetAllIngredientsNames');
Route::post('/SearchForIngredients','App\Http\Controllers\API\V1\ApiController@SearchForIngredients');

