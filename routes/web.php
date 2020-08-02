<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/app', 'HomeController@app')->name('app');
Route::get('/app/{any?}', function ($any) {
    return redirect()->route('app');
})->where('any','.*');

Route::namespace('User')->prefix('web_api')->middleware('auth')->group(function () {
    Route::get('auth/profile', 'ProfileController@getProfile');

    /* templates */
    Route::prefix('templates')->group(function () {
        Route::get('all', 'TemplateController@index');
        Route::post('store', 'TemplateController@store');
    });

    /* paragraphs */
    Route::prefix('paragraphs')->group(function() {
        Route::get('all', 'ParagraphController@index');
        Route::post('store', 'ParagraphController@store');
        Route::post('add_tag', 'ParagraphController@addTagToParagraph');
        Route::delete('remove_tag', 'ParagraphController@removeTagFromParagraph');
    });

    /* tags */
    Route::prefix('tags')->group(function() {
        Route::get('all', 'TagController@index');
        Route::post('store', 'TagController@store');
    });
});
