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
        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('requester');
            $table->unsignedBigInteger('user_requested');
            $table->tinyInteger('status')->default(0); // 0 for pending, 1 for accepted
            $table->timestamps();
        
            // Foreign key constraints
            $table->foreign('requester')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_requested')->references('id')->on('users')->onDelete('cascade');
        
            // Indexes
            $table->index('requester');
            $table->index('user_requested');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friendships');
    }
};
