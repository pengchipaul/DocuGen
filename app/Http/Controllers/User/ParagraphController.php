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
        if(!($this->validateParagraphContent($req) && $this->validateParagraphTags($req))) 
            return $this->sendInvalidResponse("create paragraph");

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
        if(!($this->validateEditAccess($req) && $this->validateParagraphContent($req)))
            return $this->sendInvalidResponse("update paragraph");        

        try {
            $paragraph = $this->repo->update($req->id, $req->all());
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e) {
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function addTagToParagraph(Request $req){
        if(!$this->validateModifyTags($req))
            return $this->sendInvalidResponse("add tag to paragraph");

        try {
            $paragraph = $this->repo->addTag($req->paragraphId, $req->tagId);
            return response()->json(["message" => "success", "data" => $paragraph], 200);
        } catch(\Exception $e){
            Log::error($e);
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function removeTagFromParagraph(Request $req){
        if(!$this->validateModifyTags($req))
            return $this->sendInvalidResponse("remove tag from paragraph");

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
            'id' => ['required', Rule::in($paragraphIds)]
        ]);

        if($validator->fails()){
            Log::alert($validator->errors());
            return false;
        }

        return true;
    }

    private function validateParagraphContent(Request $req){

        $validator = Validator::make($req->all(), [
            'content' => 'required|string|max:1000',
            'note' => 'nullable|string|max:1000'
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors());
            return false;
        }

        return true;
    }

    private function validateParagraphTags(Request $req){
        $tagIds = Auth::user()->tags->pluck('id');

        $validator = Validator::make($req->all(), [
            'tagIds' => ['array', Rule::in($tagIds)]
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors());
            return false;
        }

        return true;
    }

    private function validateModifyTags(Request $req){
        $paragraphIds = Auth::user()->templates->pluck('id');
        $tagIds = Auth::user()->tags->pluck('id');

        $validator = Validator::make($req->all(), [
            'paragraphId' => ['required', Rule::in($paragraphIds)],
            'tagId' => ['required', Rule::in($tagIds)]
        ]);

        if($validator->fails()) {
            Log::alert($validator->errors());
            return false;
        }

        return true;
    }
}
