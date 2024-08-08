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

    public static function create(string $title='*',string $preparation='*',array $ingredients=['*'],array $imagesUrls=['*']) {
        $recipe = new Recipe;

        if(is_null($title)||$title=='*') 
            return 400;
        else 
            $recipe->title=$title;
        
        if(is_null($preparation)||$preparation=='*') 
            return 400;
        else 
            $recipe->title=$title;
        
        if(is_null($ingredients)||$ingredients==['*']) 
            return 400;
        else 
            $recipe->preparation=$preparation; 

        if(is_null($imagesUrls)||$imagesUrls==['*']) 
            return 400;
        else {
            foreach ($ingredients as $ingredient){
                //sp,e stiff to be done
                //$ingredient
            }

            //$recipe->ingredients=$ingredients;
        }
            

        if(is_null($imagesUrls)||$imagesUrls==['*']) 
            return 400;
        else {
            $recipe->imagesUrls=$imagesUrls;
        }
            

        if($recipe->save()) {
            return 201;
        }
        else {
            return 422;
        }
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
