import { FC } from "react";
import { useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

interface EditProps {
    user: User;
}

const Edit: FC<EditProps> = ({ user }) => {
    const { setData, put, processing } = useForm({
        name: user.name,
        email: user.email,
        password: user.password,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">
                    Изменение пользователя &quot;{user.name}&quot;.
                </h3>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Адрес Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Введите Email"
                            defaultValue={user.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите Ваше имя"
                            defaultValue={user.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите Ваш пароль"
                            defaultValue={user.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        disabled={processing}
                    >
                        Изменить
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default Edit;
