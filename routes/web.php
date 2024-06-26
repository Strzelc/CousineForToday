<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', 'App\Http\Controllers\MainController@showHome');
Route::get('/cousine', 'App\Http\Controllers\Page\CousinePageController@showPage');
Route::get('/cousine/add-recipe', 'App\Http\Controllers\Page\CousinePageController@addRecipe');
Route::get('/cousine/add-ingredient', 'App\Http\Controllers\Page\CousinePageController@addIngredient');
Route::get('/cousine/update-ingredient', 'App\Http\Controllers\Page\CousinePageController@updateIngredient');