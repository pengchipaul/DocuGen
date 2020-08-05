<?php

namespace App\Http\Controllers\Repository;

use App\Http\Controllers\Controller;
use App\ParagraphTag;
use Illuminate\Http\Request;

use App\Tag;

class TagRepository extends Controller
{
    public function index(){
        return Tag::with('paragraphs')->get();
    }

    public function getByUserId($userId) {
        return Tag::with('paragraphs')
            ->where(["user_id" => $userId])
            ->get();
    }

    public function insert($data) {
        $tag = Tag::create($data);
        $tag["paragraphs"] = [];
        return $tag;
    }

    public function delete($tagId) {
        ParagraphTag::where('tag_id', $tagId)->delete();
        Tag::find($tagId)->delete();
        return;
    }
}
