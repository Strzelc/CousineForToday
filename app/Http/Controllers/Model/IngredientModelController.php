<?php

namespace App\Http\Controllers\Model;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ingredient;

class IngredientModelController extends Controller
{
    public static function index($columns = ['*'])
    {
        $ingredients = Ingredient::all($columns);
        return $ingredients;
    }

    public static function create($name = '*', $default_unit = '*', $avaiable_units = ['*'], $water = '*', $energy = '*', $protein = '*', $fat = '*', $carbohydrate = '*', $fiber = '*', $sugars = '*', $cink = '*')
    {
        $ingredient = new Ingredient;
        $ingredient->name = $name;
        $ingredient->default_unit = $default_unit;
        $ingredient->avaiable_units = $avaiable_units;
        $ingredient->water = $water;
        $ingredient->water = $energy;
        $ingredient->water = $protein;
        $ingredient->water = $fat;
        $ingredient->water = $carbohydrate;
        $ingredient->water = $fiber;
        $ingredient->water = $sugars;
        $ingredient->water = $cink;
        $ingredient->save();
    }

    public static function show($id, $columns = ['*'])
    {
        $ingredients = Ingredient::find($id, $columns);
        return $ingredients;
    }

    public static function update($id = null, $name = '*', $default_unit = "*", $avaiable_units = ['*'], $water = -1, $energy = -1, $protein = -1, $fat = -1, $carbohydrate = -1, $fiber = -1, $sugars = -1, $cink = -1)
    {
        if ($id != null && $id < -1) {
            return 'Bad ID';
        } else {
            $ingredient = Ingredient::find($id);
            for($i=4;$i<count(func_get_args());$i++) {
                if(func_get_arg($i)!=-1&&func_get_arg($i)<0) {
                    return 'Bad Ingredient data at argument no.'.strval($i);
                }
            }

            if ($name !=-1)
                $ingredient->name = $name;

            if ($default_unit != -1) {
                $ingredient->default_unit = $default_unit;
            }

            if ($avaiable_units != ['*']) {
                $ingredient->avaiable_units = $avaiable_units;
            }

            if ($water != -1) {
                $ingredient->water = $water;
            }

            if ($energy !=-1) {
                $ingredient->energy = $energy;
            }

            if ($protein !=-1) {
                $ingredient->protein = $protein;
            }

            if ($fat != -1) {
                $ingredient->fat = $fat;
            }

            if ($carbohydrate != -1) {
                $ingredient->carbohydrate = $carbohydrate;
            }

            if ($fiber != -1) {
                $ingredient->fiber = $fiber;
            }

            if ($sugars != -1) {
                $ingredient->sugars = $sugars;
            }

            if ($cink != -1) {
                $ingredient->cink = $cink;
            }


            $ingredient->save();
        }
    }

    public static function search( $name = '*', $default_unit = "*", $avaiable_units = ['*'], $water = -1, $energy = -1, $protein = -1, $fat = -1, $carbohydrate = -1, $fiber = -1, $sugars = -1, $cink = -1)
    { //not very readable tbh
        $ingredients = null;
        if ($name != '*')
            $ingredients = Ingredient::where('name', $name);

        if ($default_unit != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('default_unit', $default_unit);
            else
                $ingredients = $ingredients->where('default_unit', $default_unit);
        }

        if ($avaiable_units != ['*']) {
            if ($ingredients == null)
                $ingredients = Ingredient::whereJsonContains('avaiable_units', $avaiable_units);
            else
                $ingredients = $ingredients->whereJsonContains('avaiable_units', $avaiable_units);
        }

        if ($water != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('water', $water);
            else
                $ingredients = $ingredients->where('water', $water);
        }

        if ($energy != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('energy', $energy);
            else
                $ingredients = $ingredients->where('energy', $energy);
        }

        if ($protein != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('protein', $protein);
            else
                $ingredients = $ingredients->where('protein', $protein);
        }

        if ($fat != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('fat', $fat);
            else
                $ingredients = $ingredients->where('fat', $fat);
        }

        if ($carbohydrate != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('carbohydrate', $carbohydrate);
            else
                $ingredients = $ingredients->where('carbohydrate', $carbohydrate);
        }

        if ($fiber != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('fiber', $fiber);
            else
                $ingredients = $ingredients->where('fiber', $fiber);
        }

        if ($sugars != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('sugars', $sugars);
            else
                $ingredients = $ingredients->where('sugars', $sugars);
        }

        if ($cink != '*') {
            if ($ingredients == null)
                $ingredients = Ingredient::where('cink', $cink);
            else
                $ingredients = $ingredients->where('cink', $cink);
        }

        $ingredients = $ingredients->get();

        return $ingredients;
    }
    
}
