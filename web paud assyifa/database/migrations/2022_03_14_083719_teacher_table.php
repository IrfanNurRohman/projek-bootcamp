<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TeacherTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('course');
            $table->string('facebook')->default('none');
            $table->string('instagram')->default('none');
            $table->string('twitter')->default('none');
            $table->string('email')->default('none');
            $table->string('linkedin')->default('none');
            $table->string('youtube')->default('none');
            $table->string('photo');
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
        //
    }
}
