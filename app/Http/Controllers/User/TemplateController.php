<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Repository\TemplateRepository;

class TemplateController extends Controller
{
    private $repo;

    public function __construct()
    {
        $this->repo = new TemplateRepository();
    }

    public function index(){
        try {
            $templates = $this->repo->index();
            return response()->json(["data"=>$templates], 200);
        } catch (\Exception $e) {
            return response()->json(["message" => "server error"], 500);
        }
    }

    public function store(Request $req){
        $validated = $req->validate([
            'name' => 'required|string|max:100|unique:templates',
            'description' => 'nullable|string|max:500'
        ]);
        try {
            $template = $this->repo->insert($validated);
            return response()->json(["message" => "success", "data" => $template], 200);
        } catch(\Exception $e) {
            return response()->json(["message" => "serer error"], 500);
        }
        
    }
}
