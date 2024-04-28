<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Recipe extends Model
{
    use Searchable;
    use HasFactory;
    protected $table = 'recipes';
    protected $fillable = ['title','preparation','ingredients','images_urls'];
}
