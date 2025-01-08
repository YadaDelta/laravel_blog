import { FC } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface Tag {
    id: string;
    name: string;
}

interface CreateProps {
    tags: Tag[];
}

const Create: FC<CreateProps> = ({ tags }) => {
    const { auth } = usePage<any>().props;
    const { setData, post, processing } = useForm({
        user_id: auth?.user?.id,
        name: "",
        text: "",
        image: "",
        draft: "no",
        tags: [] as string[],
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post("/posts");
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">Создание нового поста.</h3>
                <Form onSubmit={submit}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicName"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("name", e.target.value)
                        }
                    >
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите название поста"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicText"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setData("text", e.target.value)
                        }
                    >
                        <Form.Label>Текст</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={5}
                            placeholder="Введите текст поста"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicImage"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("image", e.target.value)
                        }
                    >
                        <Form.Label>Ссылка на изображение</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Введите ссылку на изображение"
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicTags"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setData(
                                "tags",
                                Array.from(e.target.selectedOptions).map(
                                    ({ value }) => value
                                )
                            );
                        }}
                    >
                        <Form.Label>Теги:</Form.Label>
                        <Form.Control as="select" multiple>
                            {tags.map((tag: Tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicDraft"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("draft", e.target.checked ? "yes" : "no")
                        }
                    >
                        <Form.Check
                            type="switch"
                            id="formBasicDraft"
                            label="Черновик"
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
