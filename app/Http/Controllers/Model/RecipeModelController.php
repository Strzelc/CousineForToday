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

    public static function store($title='*',$preparation='*',$ingredients=['*'],$imagesUrls=['*']) {
        $recipe = new Recipe;
        $recipe->title=$title;
        $recipe->preparation=$preparation;
        $recipe->ingredients=$ingredients;
        $recipe->imagesUrls=$imagesUrls;
        $recipe->save();
    }

    public static function show($id,$columns = ['*']) {
        $recipe = Recipe::find($id,$columns);
        return $recipe;
    }

    public static function update($id=null,$title='*',$preparation='*',$ingredients=['*'],$imagesUrls=['*']){
        if($id!=null&&$id<0) {
            return 'Bad ID';
        }
        else {
            $recipe = Recipe::find($id);

            if($title!='*') 
                $recipe-> title=$title;
    
            if($preparation != '*') {
                $recipe-> preparation=$preparation;
            }
    
            if($ingredients != ['*']) {
                $recipe-> ingredients=$ingredients;
            }
    
            if($imagesUrls != ['*']) {
                $recipe-> imagesUrls=$imagesUrls;
            }
            $recipe->save();
        }
    }

    public static function search($title='*',$preparation='*',$ingredients=['*'],$imagesUrls=['*']) {
        $recipes = null;
        if($title!='*') 
            $recipes = Recipe::where('title',$title);

        if($preparation != '*') {
            if($recipes == null)
                $recipes = Recipe::where('preparation', $preparation);
            else 
                $recipes = $recipes -> where('preparation', $preparation);
        }

        if($ingredients != ['*']) {
            if($recipes == null)
                $recipes = Recipe::whereJsonContains('ingredients', $ingredients);
            else
                $recipes = $recipes -> whereJsonContains('ingredients', $ingredients);
        }

        if($imagesUrls != ['*']) {
            if($recipes == null)
                $recipes = Recipe::whereJsonContains('ingredients', $imagesUrls);
            else
                $recipes = $recipes -> whereJsonContains('ingredients', $imagesUrls);
        }

        $recipes = $recipes -> get();
        
        return $recipes;
    }
}
