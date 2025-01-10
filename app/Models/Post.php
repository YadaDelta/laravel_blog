<?php

namespace App\Models;

use App\States\PostState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\ModelStates\HasStates;

class Post extends Model
{
    use HasFactory;
    use HasStates;

    protected $fillable = [
        'user_id',
        'name',
        'text',
        'image',
    ];

    protected $casts = [
        'state' => PostState::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class)->as('tags');
    }
}
