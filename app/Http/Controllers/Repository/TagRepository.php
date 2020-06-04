<?php

namespace App\Http\Controllers\Repository;

use App\Http\Controllers\Controller;
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
        return $tag;
    }
}
