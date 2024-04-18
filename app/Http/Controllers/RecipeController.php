<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use app\Models\Recipe;

class RecipeController extends Controller
{
    public function index() {
        $recipe = Recipe::all();
        return response()->json($recipe);
    }

    public function store(Request $request) {
        $recipe = new Recipe;
        $recipe->title=$request->title;
        $recipe->preparation=$request->preparation;
        $recipe->ingredients=$request->ingredients;
        $recipe->imagesUrls=$request->imagesUrls;
        return response()->json(['message'=>'recipe saved'],201);
    }

    public function show($id) {
        $recipe = Recipe::find($id);
        if(empty($recipe)) {
            return response()->json(['message'=>'recipe not found'],404);
        }
        else {
            return response()->json($recipe);
        }
    }

    public function update(Request $request ){
        
    }
    /*
    public function showRecipes() {
        $list=["imageSource" => "", "cardTitle" => "Tytuł", "cardText"=>"tekst"];
        return view('recipeList',$list);
    }
    public function searchForRecipes($parameters) {
        $results=DB::table('recipes')->where('title')->get();
        return view('recipeList',$results);
    }*/
}
