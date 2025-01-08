<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);
        User::create($data);

        return redirect('/login');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user, Request $request)
    {
        $posts = $user->posts()->with('tags')->with('comments')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($request->input('tags'), function ($query, $tags) {
                $query->whereHas('tags', function($query) use ($tags){
                    $query->where('name', 'like', "%{$tags}%");
                });
            })
            ->when($request->input('draft'), function ($query, $draft) {
                $query->where('draft', 'like', "%{$draft}%");
            })
            ->paginate(5)
            ->withQueryString();
    
        return inertia('User', ['user' => $user, 'posts' => $posts, 'filters' => $request->only(['search', 'tags', 'draft'])]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
        ]);
        $user->update($data);

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect('/');
    }
}

