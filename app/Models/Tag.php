<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
