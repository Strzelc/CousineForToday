<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Ingredient extends Model
{
    use HasFactory;
    use Searchable;
    protected $fillable = ['name','default_unit','avaiable_units','water','energy','protein','fat','carbohydrate','fiber','sugars','cink'];
}
