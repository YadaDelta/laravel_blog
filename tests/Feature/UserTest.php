<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_random(): void
    {
        User::factory()->count(10)->create();

        $this->assertDatabaseCount('users', 10);
    }

    public function test_create(): void
    {
        $response = $this->post('/users', [
            'name' => 'Daniil Yashin',
            'email' => 'test@mail.ru',
            'password' => 'qwerty',
        ]);

        $this->assertDatabaseCount('users', 1);

        $this->assertDatabaseHas('users', [
            'name' => 'Daniil Yashin',
        ]);
    }

    public function test_read(): void
    {
        User::factory()->count(3)->create();

        $response = User::all();

        $this->assertCount(3, $response);
    }

    public function test_update(): void
    {
        $this->post('/users', [
            'name' => 'Daniil Yashin',
            'email' => 'test@mail.ru',
            'password' => 'qwerty',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Daniil Yashin',
        ]);

        $this->put('/users/1', [
            'name' => 'Daniel Yoshin',
            'email' => 'test@mail.com',
            'password' => 'qwerty1',
        ]);

        $this->assertDatabaseMissing('users', [
            'name' => 'Daniil Yashin',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Daniel Yoshin',
        ]);
    }

    public function test_delete(): void
    {
        $this->post('/users', [
            'name' => 'Daniil Yashin',
            'email' => 'test@mail.ru',
            'password' => 'qwerty',
        ]);

        $this->assertDatabaseCount('users', 1);

        $this->assertDatabaseHas('users', [
            'name' => 'Daniil Yashin',
        ]);

        $this->delete('/users/1');

        $this->assertDatabaseCount('users', 0);

        $this->assertDatabaseMissing('users', [
            'name' => 'Daniil Yashin',
        ]);
    }
}
