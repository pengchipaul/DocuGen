<?php

namespace App\Http\Controllers\Repository;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Paragraph;
use App\Tag;
use App\ParagraphTag;

class ParagraphRepository extends Controller
{
    public function index(){
        return Paragraph::with('tags')->get();
    }

    public function insert($data){
        $paragraph = Paragraph::create($data);
        if(array_key_exists("tagIds", $data)) {
            $paragraph->tags()->attach($data["tagIds"]);
        }
        $paragraph = Paragraph::with("tags")->find($paragraph->id);
        return $paragraph;
    }

    public function addTag($paragraphId, $tagId) {
        $paragraph = Paragraph::find($paragraphId);
        $paragraph->tags()->attach($tagId);
        return $paragraph;
    }

    public function removeTag($paragraphId, $tagId){
        $paragraph = Paragraph::find($paragraphId);
        $paragraph->tags()->detach($tagId);
        return $paragraph;
    }
}
