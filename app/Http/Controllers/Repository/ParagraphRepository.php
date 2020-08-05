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

    public function update($paragraphId, $data){
        Paragraph::find($paragraphId)->update($data);
        $paragraph = Paragraph::with("tags")->find($paragraphId);
        return $paragraph;     
    }

    public function delete($paragraphId) {
        ParagraphTag::where('paragraph_id', $paragraphId)->delete();
        Paragraph::find($paragraphId)->delete();
        return;
    }

    public function addTag($paragraphId, $tagId) {
        $paragraph = Paragraph::find($paragraphId);
        $paragraph->tags()->attach($tagId);
        $paragraph = Paragraph::with("tags")->find($paragraphId);
        return $paragraph;
    }

    public function removeTag($paragraphId, $tagId){
        $paragraph = Paragraph::find($paragraphId);
        $paragraph->tags()->detach($tagId);
        $paragraph = Paragraph::with("tags")->find($paragraphId);
        return $paragraph;
    }
}
