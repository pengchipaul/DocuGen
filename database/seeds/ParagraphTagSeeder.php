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

        $t1 = Tag::create([
            "name" => "financial support",
            "user_id" => $user->id
        ]);
        $t2 = Tag::create([
            "name" => "education background",
            "user_id" => $user->id
        ]);
        $t3 = Tag::create([
            "name" => "Student Visa",
            "user_id" => $user->id
        ]);

        $tags = [$t1, $t2, $t3];

        $sampleSize = 5;

        for($i = 0; $i < $sampleSize; $i++){
            $p = Paragraph::create([
                "content" => Str::random(rand(100, 500)),
                "note" => Str::random(rand(0, 50)),
                "user_id" => $user->id
            ]);
            sleep(1);

            $numTags = rand(0, 3);
            for($j = 0; $j < $numTags; $j++){
                $p->tags()->attach($tags[$j]->id);
            }
        }

    }
}
