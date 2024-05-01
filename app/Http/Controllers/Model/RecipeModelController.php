<?php

namespace App\Http\Controllers\Model;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recipe;

class RecipeModelController extends Controller
{
    public static function index($columns = ['*']) {
        $recipes = Recipe::all($columns);
        return $recipes;
    }

    public static function store($request,$title="title",$preparation='preparation',$ingredients=[],$imagesUrls=[]) {
        $recipe = new Recipe;
        $recipe->title=$request->title;
        $recipe->preparation=$request->preparation;
        $recipe->ingredients=$request->ingredients;
        $recipe->imagesUrls=$request->imagesUrls;
        //return response()->json(['message'=>'recipe saved'],201);
        return $recipe;
    }

    public static function show($id,$columns = ['*']) {
        $recipe = Recipe::find($id,$columns);
        /*
        if(empty($recipe)) {
            return response()->json(['message'=>'recipe not found'],404);
        }
        else {
            return response()->json($recipe);
        }
        */
        return $recipe;
    }

    public static function update($request ){
        
    }

    public static function search($title='*',$preparation='*',$ingredients=['*']) {
        //$recipes = Recipe::where('title','=',$title)->where('preparation','=',$preparation)->whereJsonContains('ingredients',$ingredients)->get();
        $recipes = Recipe::where('title','=',$title)->get();
        return $recipes;
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
