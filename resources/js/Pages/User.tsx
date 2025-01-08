import { FC } from "react";
import { Link } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "./Shared/Nav";
import Image from "react-bootstrap/Image";
import { router } from "@inertiajs/react";

interface UserProps {
    user: {
        id: number;
    };
    posts: {
        data: Array<{
            id: number;
            text: string;
            image: string;
            name: string;
            draft: string;
            tags: Array<{
                id: number;
                name: string;
            }>;
            comments: Array<any>;
        }>;
        links: Array<{
            label: string;
            url: string;
        }>;
    };
    filters: {
        search: string;
        tags: string;
        draft: boolean;
    };
}

const User: FC<UserProps> = ({ user, posts, filters }) => {
    return (
        <>
            <Nav />
            <Container className="mb-3 d-flex text-center justify-content-center w-50">
                <Link className="mx-3" href={`/posts/create`}>
                    <Button variant="primary" type="submit">
                        Создать пост
                    </Button>
                </Link>
                <Link className="mx-3" href={`/tags/create`}>
                    <Button variant="primary" type="submit">
                        Создать тег
                    </Button>
                </Link>
            </Container>
            <Container className="mb-3 d-flex justify-content-center">
                <div className="me-3 px-2 border border-primary rounded">
                    <label>Черновик?</label>
                    <input
                        className="ms-2"
                        type="checkbox"
                        id="draft"
                        name="draft"
                        onChange={(e) =>
                            router.get(
                                `/users/${user.id}`,
                                {
                                    draft: e.target.checked ? "yes" : "no",
                                    search: filters.search,
                                    tags: filters.tags,
                                },
                                { preserveState: true }
                            )
                        }
                    />
                </div>
                <input
                    className="border border-primary rounded"
                    type="text"
                    placeholder="Поиск..."
                    defaultValue={filters.search}
                    onChange={(e) =>
                        router.get(
                            `/users/${user.id}`,
                            {
                                draft: filters.draft,
                                search: e.target.value,
                                tags: filters.tags,
                            },
                            { preserveState: true }
                        )
                    }
                ></input>
                <input
                    className="ms-3 border border-primary rounded"
                    type="text"
                    placeholder="Поиск по тегам..."
                    defaultValue={filters.tags}
                    onChange={(e) =>
                        router.get(
                            `/users/${user.id}`,
                            {
                                draft: filters.draft,
                                tags: e.target.value,
                                search: filters.search,
                            },
                            { preserveState: true }
                        )
                    }
                ></input>
            </Container>
            <Container className="w-50">
                {posts.data.map((post) => {
                    const small_text =
                        post.text.length > 150
                            ? post.text.substr(0, 150) + "..."
                            : post.text;
                    return (
                        <Container
                            key={post.id}
                            className="bg-light shadow rounded mt-4 p-2 border border-primary text-center"
                        >
                            {post.draft === "yes" ? <h4>Черновик</h4> : null}
                            <Image
                                src={post.image}
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
                            <h2 className="mx-auto overflow-hidden">
                                {post.name}
                            </h2>
                            <p className="mb-4 w-75 mx-auto overflow-hidden">
                                {small_text}
                            </p>
                            {post.tags.length > 0 ? (
                                <div>
                                    Теги:
                                    {post.tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="border rounded bg-info d-inline-block px-1 mx-1"
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <p>Комментариев: {post.comments.length}</p>
                            <Link className="mx-1" href={`/posts/${post.id}`}>
                                <Button>Подробнее</Button>
                            </Link>
                            <Link
                                className="mx-1"
                                href={`/posts/${post.id}/edit`}
                            >
                                <Button variant="info">Редактировать</Button>
                            </Link>
                            <Link
                                className="mx-1 btn btn-danger"
                                as="button"
                                href={`/posts/${post.id}`}
                                method="delete"
                            >
                                Удалить
                            </Link>
                        </Container>
                    );
                })}
            </Container>
            <Container className="d-flex justify-content-center m-3">
                {posts.links.map((link) => (
                    <Link className="mx-1" key={link.label} href={link.url}>
                        <Button>
                            {link.label
                                .replace("&laquo; Previous", "<< Предыдущая")
                                .replace("Next &raquo;", "Следующая >>")}
                        </Button>
                    </Link>
                ))}
            </Container>
        </>
    );
};

export default User;
