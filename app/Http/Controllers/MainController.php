<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use App\Http\Controllers\RecipeController;

class MainController extends Controller
{
    //TODO - order controller pages
    public function showHome() {
        return redirect('/cousine');
        //return view('welcome');
    }
}
