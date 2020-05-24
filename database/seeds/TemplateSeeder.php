<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Template;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where('email', 'pengchipaul@gmail.com')->first();

        Template::create([
            'name' => 'Student Visa 500',
            'description' => 'this template is for testing',
            'user_id' => $user->id
        ]);

        Template::create([
            'name' => 'Partner Visa',
            'description' => 'this is another template',
            'user_id' => $user->id
        ]);
    }
}
