<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Controllers\RecipeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class API extends Controller
{
    public function GetRecipes() {
        $list= index();
        return $list;
    }
    /*private function searchForRecipe($word) {
        $list= DB::table('recipes')->get()->select(['title','preparation','ingredients','images_urls'])->toJson();
        return $list;
    }*/
}
