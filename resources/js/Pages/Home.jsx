import React from 'react';
import { Link } from "@inertiajs/react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export default function Home({ users }) {
    
    return (
        <>
            <Container className="d-flex text-center w-75">
                <Container>
                    <h1 className="mt-4">Тестовый CRUD:</h1>
                    <Button className="m-3" variant="primary"><Link className="text-reset text-decoration-none" href="/users/create">Создать</Link></Button>
                    <Table striped bordered hover className="mt-2" variant="dark">
                        <thead>
                            <tr>
                                <th>Емейл</th>
                                <th>ФИО</th>
                                <th>Пол</th>
                                <th>День рождения</th>
                                <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.sex}</td>
                                    <td>{user.birthday}</td>
                                    <td><Button variant="info"><Link className="text-reset text-decoration-none" href={`/users/${user.id}`}>Профиль</Link></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    );
}