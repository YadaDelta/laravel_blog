import { FC } from "react";
import { useForm } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface CreateFormData {
    post_id: number;
    name: string;
}

const Create: FC = () => {
    const { setData, post, processing } = useForm<CreateFormData>({
        post_id: 1,
        name: "",
    });

    const submiti = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post("/tags");
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">Создание нового тега.</h3>
                <Form onSubmit={submiti}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicName"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("name", e.target.value)
                        }
                    >
                        <Form.Label>Название тега</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите название тега"
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
