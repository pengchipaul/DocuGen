<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Repository\TagRepository;
use App\Tag;

class TagController extends Controller
{
    private $repo;

    public function __construct(){
        $this->repo = new TagRepository();
    }

    public function index(){
        try {
            $tags = $this->repo->getByUserId(Auth::user()->id);
            return response()->json(["message" => "success", "data" =>$tags], 200);
        } catch (\Exception $e){
            Log::debug($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function store(Request $req){
        $validated = $req->validate([
            "name" => 'required|string|max:100'
        ]);
        $validated["user_id"] = Auth::user()->id;

        try {
            $tag = $this->repo->insert($validated);
            return response()->json(["message" => "success", "data" => $tag], 200);
        } catch (\Exception $e) {
            Log::debug($e);
            return response()->json(["message" => "server error"], 500);
        }
    }
}
