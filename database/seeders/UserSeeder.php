<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [];

        for ($i = 1; $i <= 10; $i++) {
            $users[] = [
                'name' => "User {$i}",
                'username' => "user{$i}",
                'email' => "user{$i}@example.com",
                'avatar' => null,
                'bio' => null,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        User::insert($users);
    }
}
