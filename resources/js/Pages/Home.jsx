import React from 'react';
import { Link } from "@inertiajs/react";

export default function Home({ users }) {
    
    return (
        <>
        <h1>Hello Uzver!!</h1>
        <Link href="/users/create">Create</Link>

        <div>
            {users.map(user => (
                <div key={user.id}>
                    <p>{user.fullname}</p>
                    <Link href={`/users/${user.id}`}>Info</Link>
                </div>
            ))}
        </div>
        </>
    );
}