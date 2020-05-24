<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paragraph extends Model
{
    protected $fillable = [
        'content', 'note', 'user_id'
    ];

    public function tags(){
        return $this->belongsToMany('App\Tag', 'paragraph_tags');
    }
}
