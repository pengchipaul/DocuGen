<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\Repository\ParagraphRepository;
use App\Paragraph;

class ParagraphController extends Controller
{
    private $repo;

    public function __construct(){
        $this->repo = new ParagraphRepository();
    }

    public function index() {
        try {
            $paragraphs =  $this->repo->index();
            return response()->json(["message" => "success", "data" => $paragraphs], 200);
        } catch (\Exception $e){
            Log::debug($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function store(Request $req) {
        $validated = $req->validate([
            'content' => 'required|string|max:1000',
            'note' => 'nullable|string|max:1000'
        ]);
        $validated["user_id"] = Auth::user()->id;
        try {
            $paragraph = $this->repo->insert($validated);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e) {
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function addTag(Request $req){
        $validated = $this->validateModifyTags($req);

        try {
            $paragraph = $repo->addTag($req->paragraphId, $req->tagId);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e){
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function removeTag(Request $req){
        $validated = $this->validateModifyTags($req);

        try {
            $paragraph = $repo->removeTag($req->paragraphId, $req->tagId);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e){
            return response()->json(["message" => "server error"], 500);
        }
    }

    private function validateModifyTags(Request $req){
        $paragraphIds = Auth::user()->templates->pluck('id');
        $tagIds = Auth::user()->tags->pluck('id');

        return $req->validate([
            'paragraphId' => ['required', Rule::in($paragraphIds)],
            'tagId' => ['required', Rule::in($tagIds)]
        ]);
    }
}
