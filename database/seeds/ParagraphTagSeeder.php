<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use App\Paragraph;
use App\Tag;
use App\ParagraphTag;
use App\User;

class ParagraphTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where("email", "pengchipaul@gmail.com")->first();

        $p1 = Paragraph::create([
            "content" => Str::random(100),
            "note" => "This is testing paragraph 1",
            "user_id" => $user->id
        ]);
        $p2 = Paragraph::create([
            "content" => Str::random(100),
            "note" => "This is testing paragraph 2",
            "user_id" => $user->id
        ]);
        $p3 = Paragraph::create([
            "content" => Str::random(100),
            "note" => "This is testing paragraph 3",
            "user_id" => $user->id
        ]);

        $t1 = Tag::create([
            "name" => "financial support",
            "user_id" => $user->id
        ]);
        $t2 = Tag::create([
            "name" => "education background",
            "user_id" => $user->id
        ]);

        $p1->tags()->attach($t1->id);
        $p2->tags()->attach($t2->id);
        $p3->tags()->attach([$t1->id, $t2->id]);
    }
}
