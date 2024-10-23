import React from 'react';
import { useForm } from "@inertiajs/react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Edit({ user }) {
    const { data, setData, put, errors, processing } = useForm({
        email: user.email,
        fullname: user.fullname,
        sex: user.sex,
        birthday: user.birthday,
    });

    function submit(e) {
        e.preventDefault()
        put(`/users/${user.id}`);
    }

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
            <h3 className="mt-3">Изменение пользователя &quot;{user.fullname}&quot;.</h3>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setData("email", e.target.value)}>
                    <Form.Label>Адрес Email</Form.Label>
                    <Form.Control required type="email" placeholder="Введите Email" defaultValue={user.email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName" onChange={(e) => setData("fullname", e.target.value)}>
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control required type="text" placeholder="Введите Ваше имя" defaultValue={user.fullname}/>
                </Form.Group>

                <Form.Label>Ваш пол</Form.Label>
                <Form.Select defaultValue={user.sex} className="mb-3" onChange={(e) => setData("sex", e.target.value)}>
                    <option value="Неизвестно">Выберите пол</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                    <option value="Неизвестно">Не скажу</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="formBasicBirthday" onChange={(e) => setData("birthday", e.target.value)}>
                    <Form.Label>День рождения</Form.Label>
                    <Form.Control required type="date" placeholder="Введите Ваш день рождения" defaultValue={user.birthday}/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={processing}>
                    Изменить
                </Button>
            </Form>
            </Container>
        </Container>
      );
}