<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Model\RecipeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ApiController extends Controller
{
    public function GetAllRecipes() {
        $allRecipes= RecipeController::index();
        return response()->json($allRecipes);
    }
    /*private function searchForRecipe($word) {
        $list= DB::table('recipes')->get()->select(['title','preparation','ingredients','images_urls'])->toJson();
        return $list;
    }*/
}
