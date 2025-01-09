<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = QueryBuilder::for(Post::class)->with('tags')->with('comments')
            ->when(
                $request->input('search'),
                function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                }
            )
            ->when(
                $request->input('tags'),
                function ($query, $tags) {
                    $query->whereHas(
                        'tags',
                        function ($query) use ($tags) {
                            $query->where('name', 'like', "%{$tags}%");
                        }
                    );
                }
            )
            ->where('draft', 'like', 'no')
            ->paginate(5)
            ->withQueryString();

        return inertia('Home', ['posts' => $posts, 'filters' => $request->only(['filter[name]', 'tags'])]);
    }

    public function create()
    {
        $tags = Tag::all();

        return inertia('Post/Create', ['tags' => $tags]);
    }

    public function show(Post $post)
    {
        $comments = $post->comments()->get();
        $tags = $post->tags()->get();

        return inertia('Post', ['postData' => $post, 'comments' => $comments, 'tags' => $tags]);
    }

    public function edit(Post $post)
    {
        $postTags = $post->tags()->get();
        $allTags = Tag::all();

        return inertia('Post/Edit', ['post' => $post, 'allTags' => $allTags, 'postTags' => $postTags]);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate(
            [
                'user_id' => ['required'],
                'name' => ['required'],
                'text' => ['required'],
                'image' => ['required'],
                'draft' => ['required'],
            ]
        );
        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }
        $post->update($data);

        return redirect('/');
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'user_id' => ['required'],
                'name' => ['required'],
                'text' => ['required'],
                'image' => ['required'],
                'draft' => ['required'],
            ]
        );

        $post = Post::create(
            [
                'user_id' => $request->user_id,
                'name' => $request->name,
                'text' => $request->text,
                'image' => $request->image,
                'draft' => $request->draft,
            ]
        );
        if ($request->has('tags')) {
            $post->tags()->attach($request->tags);
        }

        return redirect('/');
    }

    public function destroy(Post $post)
    {
        $post->delete();
    }
}
