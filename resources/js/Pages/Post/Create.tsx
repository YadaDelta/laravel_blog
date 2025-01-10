import { FC, useState } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
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
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-EWqSbV5RUGPHMjJgcsvRsJtNYp3Y8Y4Lw&s",
        draft: false,
        tags: [] as string[],
    });

    const [newTag, setNewTag] = useState<string>("");

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
                            type="text"
                            placeholder="Введите ссылку на изображение"
                        />
                    </Form.Group>
                    <Form.Group
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
                        <Form.Label>Выбор тегов (Ctrl + клик):</Form.Label>
                        <Form.Control as="select" multiple>
                            {tags.map((tag: Tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Container className="mb-3 p-0">
                        <input
                            className="py-1 my-1 rounded border w-50"
                            type="newTag"
                            placeholder="Добавить новый тег в список"
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                        <Link
                            className="btn btn-primary"
                            as="button"
                            href="/tags"
                            method="post"
                            data={{ name: newTag }}
                        >
                            Добавить
                        </Link>
                    </Container>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicDraft"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData("draft", e.target.checked);
                        }}
                    >
                        <Form.Check
                            type="switch"
                            id="formBasicDraft"
                            label="Черновик?"
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
