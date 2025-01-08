import { FC } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

const Nav: FC = () => {
    const { auth } = usePage<any>().props;

    return (
        <>
            <Container className="bg-dark text-white rounded">
                <Stack className="mb-3" direction="horizontal" gap={3}>
                    <Container className="p-2">
                        <h2 className="text-nowrap">
                            <Link
                                className="text-reset text-decoration-none"
                                href="/"
                            >
                                ТЗ Хекслет
                            </Link>
                        </h2>
                    </Container>
                    {auth ? (
                        <Container className="ms-auto p-2 w-50">
                            <Stack direction="horizontal" gap={3}>
                                <div className="text-nowrap ms-auto">
                                    Пользователь: {auth.user?.username}
                                </div>
                                <Link href={`/users/${auth.user?.id}`}>
                                    <Button variant="primary">Профиль</Button>
                                </Link>
                                <Link
                                    className="btn btn-danger"
                                    as="button"
                                    href="/logout"
                                    method="post"
                                >
                                    Выйти
                                </Link>
                            </Stack>
                        </Container>
                    ) : (
                        <Container className="ms-auto p-2 w-25">
                            <Stack direction="horizontal" gap={3}>
                                <Link href="/login">
                                    <Button
                                        className="ms-auto"
                                        variant="primary"
                                    >
                                        Войти
                                    </Button>
                                </Link>
                                <Link href="/users/create">
                                    <Button variant="primary">
                                        Регистрация
                                    </Button>
                                </Link>
                            </Stack>
                        </Container>
                    )}
                </Stack>
            </Container>
        </>
    );
};

export default Nav;
