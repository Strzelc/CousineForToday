<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class API extends Controller
{
    public function GetRecipes() {
        $list= DB::table('recipes')->get()->select(['title','preparation','ingredients','images_urls'])->toJson();
        return $list;
    }
}
