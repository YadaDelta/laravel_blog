import { FC } from "react";
import { useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const Create: FC = () => {
    const { setData, post, processing } = useForm<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post("/users");
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">Регистрация нового пользователя.</h3>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите Ваше имя"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите Ваш Email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Введите Ваш пароль"
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
                        Создать
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default Create;
