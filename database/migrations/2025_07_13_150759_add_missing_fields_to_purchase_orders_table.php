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
        Schema::table('purchase_orders', function (Blueprint $table) {
            $table->string('game_id')->nullable();
            $table->string('game_server')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('sender_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('purchase_orders', function (Blueprint $table) {
            $table->dropColumn(['game_id', 'game_server', 'payment_method', 'whatsapp', 'sender_name']);
        });
    }
};
