<?php

namespace App\Http\Controllers;

use App\Models\UserTest;
use Illuminate\Http\Request;

class UserTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = UserTest::all();

        return inertia('Home', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required'],
            'fullname' => ['required'],
            'sex' => ['required'],
            'birthday' => ['required'],
        ]);
        UserTest::create($data);

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(UserTest $user)
    {
        return inertia('User', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserTest $user)
    {
        return inertia('Edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserTest $user)
    {
        $data = $request->validate([
            'fullname' => ['required'],
        ]);
        $user->update($data);

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserTest $user)
    {
        $user->delete();

        return redirect('/');
    }
}
