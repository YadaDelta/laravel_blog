import { FC } from "react";
import { useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface LoginForm {
    email: string;
    password: string;
}

const Login: FC = () => {
    const { setData, post, processing } = useForm<LoginForm>({
        email: "",
        password: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post("/login");
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">Вход в аккаунт.</h3>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Адрес Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Введите Email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Введите пароль"
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
                        Войти
                    </Button>
                </Form>
            </Container>
        </Container>
    );
};

export default Login;
