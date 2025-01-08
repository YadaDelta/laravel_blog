<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'post_id',
        'name',
    ];

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
