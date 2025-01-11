import { FC } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "./Shared/Nav";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";

interface PostProps {
    postData: {
        id: number;
        image: string;
        name: string;
        text: string;
    };
    comments: Array<{
        id: number;
        author: string;
        text: string;
    }>;
    tags: Array<{
        id: number;
        name: string;
    }>;
    user: Array<{
        id: number;
        name: string;
    }>;
}

const Post: FC<PostProps> = ({ postData, comments, tags, user }) => {
    const { auth } = usePage<any>().props;
    const { setData, post, processing } = useForm({
        post_id: postData.id,
        author: auth?.user?.username,
        text: "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        post("/comments");
    };
    console.log(user);
    return (
        <>
            <Nav />
            <Container className="bg-light shadow rounded mt-4 p-2 border border-primary text-center w-50">
                <Image
                    src={postData.image}
                    rounded
                    alt=""
                    width="auto"
                    height="100px"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg-EWqSbV5RUGPHMjJgcsvRsJtNYp3Y8Y4Lw&s";
                    }}
                />
                <h2 className="mx-auto overflow-hidden">{postData.name}</h2>
                <p className="mb-4 w-75 mx-auto overflow-hidden">
                    {postData.text}
                </p>
                {tags.length > 0 ? (
                    <div>
                        Теги:
                        {tags.map((tag) => (
                            <div
                                key={tag.id}
                                className="border rounded bg-info d-inline-block px-1 mx-1"
                            >
                                {tag.name}
                            </div>
                        ))}
                    </div>
                ) : null}
                <h5>Автор поста: {user[0].name}</h5>
            </Container>
            <Container className="d-flex align-content-center">
                <Stack className="text-center m-3 w-50" gap={3}>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <h3>{comment.author}</h3>
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </Stack>
            </Container>
            {auth ? (
                <Form className="w-50 mx-auto" onSubmit={submit}>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicText"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData("text", e.target.value)
                        }
                    >
                        <Form.Label>Написать комментарий</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Комментарий..."
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
            ) : null}
        </>
    );
};

export default Post;
