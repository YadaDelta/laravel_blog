import { useForm } from "@inertiajs/react";

export default function Edit({ user }) {
    const { data, setData, put, errors, processing } = useForm({
        fullname: user.fullname,
    });

    function submit(e) {
        e.preventDefault()
        put(`/users/${user.id}`);
    }

    return (
        <>
        <h1>Edit</h1>
        <div>
            <form onSubmit={submit}>
                <textarea value={data.fullname} onChange={(e) => setData("fullname", e.target.value)}></textarea>
                {errors.fullname && <p>{errors.fullname}</p>}
                <button disabled={processing}>
                    Update User
                </button>
            </form>
        </div>
        </>
    )
}