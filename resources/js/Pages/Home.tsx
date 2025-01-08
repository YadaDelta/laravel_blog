import { FC } from "react";
import { Link } from "@inertiajs/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "./Shared/Nav";
import Image from "react-bootstrap/Image";
import { router } from "@inertiajs/react";

interface Post {
    id: number;
    text: string;
    image: string;
    name: string;
    tags: Array<{ id: number; name: string }>;
    comments: Array<any>;
}

interface Filters {
    search: string;
    tags: string;
}

interface HomeProps {
    posts: {
        data: Post[];
        links: Array<{ label: string; url: string }>;
    };
    filters: Filters;
}

const Home: FC<HomeProps> = ({ posts, filters }) => {
    return (
        <>
            <Container>
                <Container>
                    <Nav />
                    <Container className="d-flex justify-content-center">
                        <input
                            className="border border-primary rounded"
                            type="text"
                            placeholder="Поиск..."
                            defaultValue={filters.search}
                            onChange={(e) =>
                                router.get(
                                    "/",
                                    {
                                        search: e.target.value,
                                        tags: filters.tags,
                                    },
                                    { preserveState: true }
                                )
                            }
                        />
                        <input
                            className="ms-3 border border-primary rounded"
                            type="text"
                            placeholder="Поиск по тегам..."
                            defaultValue={filters.tags}
                            onChange={(e) =>
                                router.get(
                                    "/",
                                    {
                                        tags: e.target.value,
                                        search: filters.search,
                                    },
                                    { preserveState: true }
                                )
                            }
                        />
                    </Container>
                    <Container className="w-50">
                        {posts.data.map((post) => {
                            const small_text =
                                post.text.length > 150
                                    ? post.text.substring(0, 150) + "..."
                                    : post.text;
                            return (
                                <Container
                                    key={post.id}
                                    className="bg-light shadow rounded mt-4 p-2 border border-primary text-center"
                                >
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
                                    <Link href={`/posts/${post.id}`}>
                                        <Button>Подробнее</Button>
                                    </Link>
                                </Container>
                            );
                        })}
                    </Container>
                    <Container className="d-flex justify-content-center m-3">
                        {posts.links.map((link) => (
                            <Link
                                className="mx-1"
                                key={link.label}
                                href={link.url}
                            >
                                <Button>
                                    {link.label
                                        .replace(
                                            "&laquo; Previous",
                                            "<< Предыдущая"
                                        )
                                        .replace(
                                            "Next &raquo;",
                                            "Следующая >>"
                                        )}
                                </Button>
                            </Link>
                        ))}
                    </Container>
                </Container>
            </Container>
        </>
    );
};

export default Home;
