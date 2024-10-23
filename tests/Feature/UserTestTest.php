<?php

namespace Tests\Feature;

use App\Models\UserTest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTestTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_random(): void
    {
        UserTest::factory()->count(10)->create();

        $this->assertDatabaseCount('user_tests', 10);
    }

    public function test_create(): void
    {
        $response = $this->post('/users', [
            'email' => 'test@mail.ru',
            'fullname' => 'Daniil Yashin',
            'sex' => 'male',
            'birthday' => '06.09.2000',
        ]);

        $this->assertDatabaseCount('user_tests', 1);

        $this->assertDatabaseHas('user_tests', [
            'fullname' => 'Daniil Yashin',
        ]);
    }

    public function test_read(): void
    {
        UserTest::factory()->count(3)->create();

        $response = UserTest::all();

        $this->assertCount(3, $response);
    }

    public function test_update(): void
    {
        $this->post('/users', [
            'email' => 'test@mail.ru',
            'fullname' => 'Daniil Yashin',
            'sex' => 'male',
            'birthday' => '06.09.2000',
        ]);

        $this->assertDatabaseHas('user_tests', [
            'fullname' => 'Daniil Yashin',
        ]);

        $this->put('/users/1', [
            'email' => 'test@mail.ru',
            'fullname' => 'Daniel Yoshin',
            'sex' => 'male',
            'birthday' => '06.09.2000',
        ]);

        $this->assertDatabaseMissing('user_tests', [
            'fullname' => 'Daniil Yashin',
        ]);

        $this->assertDatabaseHas('user_tests', [
            'fullname' => 'Daniel Yoshin',
        ]);
    }

    public function test_delete(): void
    {
        $this->post('/users', [
            'email' => 'test@mail.ru',
            'fullname' => 'Daniil Yashin',
            'sex' => 'male',
            'birthday' => '06.09.2000',
        ]);

        $this->assertDatabaseCount('user_tests', 1);

        $this->assertDatabaseHas('user_tests', [
            'fullname' => 'Daniil Yashin',
        ]);

        $this->delete('/users/1');

        $this->assertDatabaseCount('user_tests', 0);

        $this->assertDatabaseMissing('user_tests', [
            'fullname' => 'Daniil Yashin',
        ]);
    }
}
