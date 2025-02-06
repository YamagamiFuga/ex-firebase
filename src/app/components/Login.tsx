"use client";

import {useState} from 'react';
import { signupWithEmailAndPassword, signinWithEmailAndPassword, logOut } from '../firebase/firebase-config';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const signup = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await signupWithEmailAndPassword(email, password);
        console.log("登録User情報 :", user)
    };

    const signin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = await signinWithEmailAndPassword(email, password);
        console.log("サインインUser情報 :", user)
    };
    return (
        <div>
            <h1>登録用フォーム</h1>
            <form onSubmit={signup}>
                <input type='text'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <input type='password'
                value={password}
                onChange={(event) => setpassword(event.target.value)}
                />
                <button type={'submit'}>登録</button>
            </form>
            <h2>ログイン用フォーム</h2>
            <form onSubmit={signin}>
                <input type='text'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                />
                <input type='password'
                value={password}
                onChange={(event) => setpassword(event.target.value)}
                />
                <button type={'submit'}>ログイン</button>
            </form>
            <div>
            <button type={'button'} onClick={logOut}>
                ログアウト
            </button>
            </div>
        </div>
    );

}
