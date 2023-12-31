<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->integer('days');
            $table->integer('free_days')->default(0);
            $table->bigInteger('price');
            $table->enum('type',['dedicated','vip','normal'])->default('normal');
            $table->float('maximum_traffic_usage')->default(0);
            $table->boolean('is_active')->default(false);
            $table->string('random_username_prefix');
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
        Schema::dropIfExists('plans');
    }
};
