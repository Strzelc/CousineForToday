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

    public static function create(string $name = '*', array $avaiable_units = ['*'], float $water = 0, float $energy = 0, float $protein = 0, float $fat = 0, float $carbohydrate = 0, float $fiber = 0, float $sugars = 0, float $cink = 0)
    {
        $ingredient = new Ingredient;
        $ingredient->name = $name;
        $ingredient->avaiable_units = json_encode($avaiable_units);
        $ingredient->water = $water;
        $ingredient->energy = $energy;
        $ingredient->protein = $protein;
        $ingredient->fat = $fat;
        $ingredient->carbohydrate = $carbohydrate;
        $ingredient->fiber = $fiber;
        $ingredient->sugars = $sugars;
        $ingredient->cink = $cink;
        $ingredient->save();
        return "OK";
    }

    public static function show(int $id, array $columns = ['*'])
    {
        $ingredients = Ingredient::find($id, $columns);
        return $ingredients;
    }

    public static function update(int $id = null, string $name = '*', array $avaiable_units = ['*'], float $water = -1, float $energy = -1, float $protein = -1, float $fat = -1, float $carbohydrate = -1, float $fiber = -1, float $sugars = -1, float $cink = -1)
    {
        if ($id != null && $id < -1) {
            return 'Bad ID';
        } else {
            $ingredient = Ingredient::find($id);

            for ($i = 4; $i < count(func_get_args()); $i++) {
                if (func_get_arg($i) != -1 && func_get_arg($i) < 0) {
                    return 'Bad Ingredient data at argument no.' . strval($i);
                }
            }
            /*
            TODO-
            foreach( inf as args_function) {}
            switch case argument_function_name = 
            */

            if ($name != '*') {
                $ingredient->name = $name;
            }

            if ($avaiable_units != ['*']) {
                $ingredient->avaiable_units = $avaiable_units;
            }

            if ($water >= 0) {
                $ingredient->water = $water;
            }

            if ($energy >= 0) {
                $ingredient->energy = $energy;
            }

            if ($protein >= 0) {
                $ingredient->protein = $protein;
            }

            if ($fat >= 0) {
                $ingredient->fat = $fat;
            }

            if ($carbohydrate >= 0) {
                $ingredient->carbohydrate = $carbohydrate;
            }

            if ($fiber >= 0) {
                $ingredient->fiber = $fiber;
            }

            if ($sugars >= 0) {
                $ingredient->sugars = $sugars;
            }

            if ($cink >= 0) {
                $ingredient->cink = $cink;
            }
            $ingredient->save();
            return 'OK';
        }
    }

    public static function search(string $name = '*', array $avaiable_units = ['*'], float $water = -1, float $energy = -1, float $protein = -1, float $fat = -1, float $carbohydrate = -1, float $fiber = -1, float $sugars = -1, float $cink = -1)
    { //not very readable tbh
        $ingredients = null;
        if ($name != '*')
            $ingredients = Ingredient::where('name', $name);

        if ($avaiable_units != ['*']) {
            if ($ingredients == null)
                $ingredients = Ingredient::whereJsonContains('avaiable_units', $avaiable_units);
            else
                $ingredients = $ingredients->whereJsonContains('avaiable_units', $avaiable_units);
        }

        if ($water >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('water', $water);
            else
                $ingredients = $ingredients->where('water', $water);
        }

        if ($energy >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('energy', $energy);
            else
                $ingredients = $ingredients->where('energy', $energy);
        }

        if ($protein >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('protein', $protein);
            else
                $ingredients = $ingredients->where('protein', $protein);
        }

        if ($fat >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('fat', $fat);
            else
                $ingredients = $ingredients->where('fat', $fat);
        }

        if ($carbohydrate >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('carbohydrate', $carbohydrate);
            else
                $ingredients = $ingredients->where('carbohydrate', $carbohydrate);
        }

        if ($fiber >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('fiber', $fiber);
            else
                $ingredients = $ingredients->where('fiber', $fiber);
        }

        if ($sugars >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('sugars', $sugars);
            else
                $ingredients = $ingredients->where('sugars', $sugars);
        }

        if ($cink >= 0) {
            if ($ingredients == null)
                $ingredients = Ingredient::where('cink', $cink);
            else
                $ingredients = $ingredients->where('cink', $cink);
        }

        $ingredients = $ingredients->get();

        return $ingredients;
    }

}
