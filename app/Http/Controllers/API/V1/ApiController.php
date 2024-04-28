<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Model\RecipeModelController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ApiController extends Controller
{
    public function GetAllRecipes() {
        $allRecipes= RecipeModelController::index(['title','ingredients','preparation','images_urls']);
        return response()->json($allRecipes);
    }
    public function SearchForRecipes(Request $request) {
        $recipes = RecipeController::search($request->title,$request->preparation,$request->ingredients);
        return response()->json($recipes);
    }
    /*private function searchForRecipe($word) {
        $list= DB::table('recipes')->get()->select(['title','preparation','ingredients','images_urls'])->toJson();
        return $list;
    }*/
}
