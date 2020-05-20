<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile(){
        $username = Auth::user()->name;
        $email = Auth::user()->email;
        return response()->json(["profile" => ["username" => $username, "email" => $email]], 200);
    }
}
