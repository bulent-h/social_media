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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->integer('sender_id');
            $table->integer('receiver_id');


            $table->text('text_content');
            $table->text('media_content_path')->nullable();

            // $table->boolean('is_edited')->nullable();
            // $table->boolean('is_deleted')->nullable();

            // $table->integer('replied_message_id')->nullable();
            // $table->integer('replied_user_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
