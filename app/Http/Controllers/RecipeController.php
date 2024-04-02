<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RecipeController extends Controller
{
    public function showRecipes() {
        $list=["imageSource" => "", "cardTitle" => "Tytuł", "cardText"=>"tekst"];
        return view('recipeList',$list);
    }
    public function showHome() {
        return redirect('/cousine');
        //return view('welcome');
    }
}
