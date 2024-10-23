import React from 'react';
import { useForm } from "@inertiajs/react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function Create() {
    const { setData, post, processing } = useForm({
        email: "",
        fullname: "",
        sex: "",
        birthday: "",
    });

    function submit(e) {
        e.preventDefault()
        post('/users');
    }

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
            <h3 className="mt-3">Создание нового пользователя.</h3>
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setData("email", e.target.value)}>
                    <Form.Label>Адрес Email</Form.Label>
                    <Form.Control required type="email" placeholder="Введите Email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName" onChange={(e) => setData("fullname", e.target.value)}>
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control required type="text" placeholder="Введите Ваше имя"/>
                </Form.Group>

                <Form.Label>Ваш пол</Form.Label>
                <Form.Select className="mb-3" onChange={(e) => setData("sex", e.target.value)}>
                    <option value="Неизвестно">Выберите пол</option>
                    <option>Мужской</option>
                    <option>Женский</option>
                    <option value="Неизвестно">Не скажу</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="formBasicBirthday" onChange={(e) => setData("birthday", e.target.value)}>
                    <Form.Label>День рождения</Form.Label>
                    <Form.Control required type="date" placeholder="Введите Ваш день рождения"/>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={processing}>
                    Создать
                </Button>
            </Form>
            </Container>
        </Container>
      );
}