<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function store(Request $req) {
        $this->validateParagraphContent($req);
        $this->validateParagraphTags($req);

        $input = $req->all();
        $input["user_id"] = Auth::user()->id;
        try {
            $paragraph = $this->repo->insert($input);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e) {
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function update(Request $req){
        $this->validateEditAccess($req);

        $this->validateParagraphContent($req);

        try {
            $paragraph = $this->repo->update($req->paragraphId, $req);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e) {
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function addTagToParagraph(Request $req){
        $this->validateModifyTags($req);

        try {
            $paragraph = $this->repo->addTag($req->paragraphId, $req->tagId);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e){
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function removeTagFromParagraph(Request $req){
        $this->validateModifyTags($req);

        try {
            $paragraph = $this->repo->removeTag($req->paragraphId, $req->tagId);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e){
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    private function validateEditAccess(Request $req) {
        $paragraphIds = Auth::user()->paragraphs->pluck('id');

        $validator = Validator::make($req->all(), [
            'paragraphId' => ['required', Rule::in($paragraphIds)]
        ]);

        if($validator->fails()){
            Log::alert($validator->errors(),
                ["user" => Auth::user()->email, "action" => "update paragraph"]);
            return response()->json(["message" => "invalid input"], 403);
        }
    }

    private function validateParagraphContent(Request $req){

        $validator = Validator::make($req->all(), [
            'content' => 'required|string|max:1000',
            'note' => 'nullable|string|max:1000'
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors(),
                ["user" => Auth::user()->email, "action" => "create/update paragraphs"]);
            return response()->json(["message" => "invalid input"], 403);
        }
    }

    private function validateParagraphTags(Request $req){
        $tagIds = Auth::user()->tags->pluck('id');

        $validator = Validator::make($req->all(), [
            'tagIds' => ['array', Rule::in($tagIds)]
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors(),
                ["user" => Auth::user()->email, "action" => "create paragraph tags"]);
            return response()->json(["message" => "invalid input"], 403);
        }
    }

    private function validateModifyTags(Request $req){
        $paragraphIds = Auth::user()->templates->pluck('id');
        $tagIds = Auth::user()->tags->pluck('id');

        $validator = Validator::make($req->all(), [
            'paragraphId' => ['required', Rule::in($paragraphIds)],
            'tagId' => ['required', Rule::in($tagIds)]
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors(),
                ["user" => Auth::user()->email, "action" => "add/remove tags"]);
            return response()->json(["message" => "invalid input"], 403);
        }
    }
}
