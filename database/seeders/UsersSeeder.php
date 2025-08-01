<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'admin',
                'email' => 'admin@mail.com',
                'email_verified_at' => null,
                'password' => Hash::make('password'),
                'remember_token' => null,
                'created_at' => '2024-10-11 06:23:14',
                'updated_at' => '2024-10-11 06:23:14',
                'role' => 1,
            ],
            [
                'id' => 2,
                'name' => 'Test User1',
                'email' => 'user@mail.com',
                'email_verified_at' => null,
                'password' => Hash::make('password'),
                'remember_token' => null,
                'created_at' => '2024-10-15 08:06:24',
                'updated_at' => '2025-07-13 10:21:16',
                'role' => 0,
            ],
        ]);
    }
}
