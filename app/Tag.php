<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name', 'user_id'
    ];

    public function paragraphs(){
        return $this->belongsToMany('App\Paragraph', 'paragraph_tags');
    }
}
