import { FC, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface Post {
    user_id: number;
    name: string;
    text: string;
    image: string;
    state: string;
    id: number;
}

interface Tag {
    id: number;
    name: string;
}

interface EditProps {
    post: Post;
    allTags: Tag[];
    postTags: Tag[];
}

const Edit: FC<EditProps> = ({ post, allTags, postTags }) => {
    const { setData, put, processing } = useForm({
        user_id: post.user_id,
        name: post.name,
        text: post.text,
        image: post.image,
        state: post.state,
        tags: postTags.map((a) => a.id),
    });

    const [newTag, setNewTag] = useState<string>("");

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <Container className="d-flex justify-content-center w-50">
            <Container>
                <h3 className="mt-3">Редактирование поста.</h3>
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
                            defaultValue={post.name}
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
                            defaultValue={post.text}
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
                            defaultValue={post.image}
                        />
                    </Form.Group>
                    <Form.Group
                        controlId="formBasicTags"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setData(
                                "tags",
                                Array.from(e.target.selectedOptions).map(
                                    ({ value }) => Number(value)
                                )
                            );
                        }}
                    >
                        <Form.Label>Теги:</Form.Label>
                        <Form.Control
                            as="select"
                            multiple
                            defaultValue={postTags.map((a) => a.id.toString())}
                        >
                            {allTags.map((tag) => (
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData(
                                "state",
                                e.target.checked ? "draft" : "published"
                            )
                        }
                    >
                        {post.state === "draft" ? (
                            <Form.Check
                                type="switch"
                                id="formBasicDraft"
                                label="Черновик"
                                defaultChecked
                            />
                        ) : (
                            <Form.Check
                                type="switch"
                                id="formBasicDraft"
                                label="Черновик"
                            />
                        )}
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

export default Edit;
