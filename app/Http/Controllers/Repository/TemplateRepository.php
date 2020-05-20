<?php

namespace App\Http\Controllers\Repository;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Template;

class TemplateRepository extends Controller
{
    public function index(){
        return Template::all();
    }

    public function insert($data) {
        $template = new Template($data);
        return $template;
    }
}
