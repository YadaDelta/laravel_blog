<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'post_id' => ['required'],
                'author' => ['required'],
                'text' => ['required'],
            ]
        );
        Comment::create($data);
    }
}
