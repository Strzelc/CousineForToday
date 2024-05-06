<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->json('avaiable_units');
            //nutriens
            $table->float('water');
            $table->float('energy');
            $table->float('protein');
            $table->float('fat');
            $table->float('carbohydrate');
            $table->float('fiber');
            $table->float('sugars');
            $table->float('cink');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingredients');
    }
};
