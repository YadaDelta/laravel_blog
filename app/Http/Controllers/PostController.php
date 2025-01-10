<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Tag;
use App\States\Draft as Draft;
use App\States\Published as Published;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = QueryBuilder::for(Post::class)->with('tags')->with('comments')
            ->allowedFilters([AllowedFilter::partial('search', 'name'), AllowedFilter::partial('tags', 'tags.name')])
            ->where('state', '=', 'published')
            ->paginate(5)
            ->withQueryString();

        return inertia('Home', ['posts' => $posts, 'filters' => $request]);
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
        if (Auth::id() !== $post->user_id) {
            return redirect('/');
        }

        $postTags = $post->tags()->get();
        $allTags = Tag::all();

        return inertia('Post/Edit', ['post' => $post, 'allTags' => $allTags, 'postTags' => $postTags]);
    }

    public function update(Request $request, Post $post)
    {
        if (Auth::id() !== $post->user_id) {
            return redirect('/');
        }

        $data = $request->validate(
            [
                'user_id' => ['required'],
                'name' => ['required'],
                'text' => ['required'],
                'image' => ['required'],
            ]
        );
        if ($request->has('tags')) {
            $post->tags()->sync($request->tags);
        }
        $post->update($data);

        if ($request->state == 'published') {
            if (! $post->state->equals(Published::class)) {
                $post->state->transitionTo(Published::class);
                $post->save();
            }
        } else {
            if (! $post->state->equals(Draft::class)) {
                $post->state->transitionTo(Draft::class);
                $post->save();
            }
        }

        return redirect("/users/{$post->user_id}");
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'user_id' => ['required'],
                'name' => ['required'],
                'text' => ['required'],
                'image' => ['required'],
            ]
        );

        $post = Post::create(
            [
                'user_id' => $request->user_id,
                'name' => $request->name,
                'text' => $request->text,
                'image' => $request->image,
            ]
        );
        if ($request->has('tags')) {
            $post->tags()->attach($request->tags);
        }

        if (! $request->draft) {
            $post->state->transitionTo(Published::class);
            $post->save();
        }

        return redirect("/users/{$post->user_id}");
    }

    public function destroy(Post $post)
    {
        if (Auth::id() !== $post->user_id) {
            return redirect('/');
        }

        $post->delete();
    }
}
