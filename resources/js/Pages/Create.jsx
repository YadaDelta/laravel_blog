import React from 'react';
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        fullname: "",
        sex: "",
        birthday: "",
    });

    function submit(e) {
        e.preventDefault()
        post('/users');
    }

    return (
        <>
        <h1>Create</h1>
        <div>
            <form onSubmit={submit}>
                <textarea value={data.email} onChange={(e) => setData("email", e.target.value)}></textarea>
                <textarea value={data.fullname} onChange={(e) => setData("fullname", e.target.value)}></textarea>
                <textarea value={data.sex} onChange={(e) => setData("sex", e.target.value)}></textarea>
                <textarea value={data.birthday} onChange={(e) => setData("birthday", e.target.value)}></textarea>
                {errors.fullname && <p>{errors.fullname}</p>}
                <button disabled={processing}>
                    Create User
                </button>
            </form>
        </div>
        </>
    )
}