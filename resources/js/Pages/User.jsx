import { Link, useForm } from "@inertiajs/react";
import Button from 'react-bootstrap/Button';

export default function User({user}) {

    const { delete: destroy } = useForm();

    function submit(e) {
        e.preventDefault()
        destroy(`/users/${user.id}`)
    }

    return (
        <>
        <h1>User {user.fullname}</h1>
        <div>
                        <form onSubmit={submit}>
                            <button>
                            Delete
                            </button>
                            <Button variant="dark" type="submit">Dark</Button>
                        </form>
                    </div>
                    <Link href={`/users/${user.id}/edit`}>Update</Link>
        </>
    );
}