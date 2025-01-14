<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function create()
    {
        return inertia('Post/Tag');
    }

    public function store(Request $request)
    {
        $data = $request->validate(
            [
                'name' => ['required'],
            ]
        );
        Tag::create($data);
    }
}
