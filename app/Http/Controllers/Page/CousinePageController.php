<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Model\RecipeController;

class CousinePageController extends Controller
{
    public function showPage() {
        return view('recipeList');
    }
    public function addRecipe() {
        return view('addRecipe');
    }
    public function addIngredient() {
        return view('addIngredient');
    }
    public function updateIngredient() {
        return view("updateIngredient");
    }
}
