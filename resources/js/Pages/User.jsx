import React from 'react';
import { Link, useForm } from "@inertiajs/react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function User({ user }) {

    const { delete: destroy } = useForm();

    function submit(e) {
        e.preventDefault()
        destroy(`/users/${user.id}`)
    }

    return (
        <>
            <Container className="d-flex text-center w-50">
                <Container>
                <h1 className="m-4">{user.fullname}</h1>
                <p>Email: {user.email}</p>
                <p>Пол: {user.sex}</p>
                <p className='mb-4'>День рождения: {user.birthday}</p>
                <Container className="d-flex justify-content-center ">
                    <Button className="mx-3" variant="primary" type="submit">
                        <Link className="text-reset text-decoration-none" href={`/users/${user.id}/edit`}>Изменить</Link>
                    </Button>
                    <form onSubmit={submit}>
                        <Button variant="danger" type="submit">Удалить</Button>
                    </form>
                </Container>
                </Container>
            </Container>
        </>
    );
}