<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string("ingredientName");
            $table->decimal("ingredientRatio",9,7);
            $table->decimal("componentCost",5,3);
            $table->integer("componentWeight");
            $table->decimal("productRatio",9,5);
            $table->unsignedBigInteger('product_id');
            $table->index('product_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('components');
    }
}
