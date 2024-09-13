"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/controllers/endpoints";
import { ILogin } from "@/app/interfaces/interfaces";

const LoginPage: React.FC = () => {
    const [email, setEmail]= useState<string>("")
    const [password, setPassword]= useState<string>("")
    const router = useRouter()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const dataLogin:ILogin = {email, password}
        const response = await fetch(login,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataLogin)
        });
        if(response.ok){
            const data = await response.json();
            sessionStorage.setItem('token',data.token);
            sessionStorage.setItem('name',data.user.name);
            sessionStorage.setItem('id',data.user.id)
            alert(data.message)
            router.push('./posts')
        }else{
            const data = await response.json();
            alert("error " + data.message)
        }
        
        setEmail("");
        setPassword("");
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          value={email}
          required
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          value={password}
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <Link href="./register">Crea una cuenta</Link>
    </div>
  );
};

export default LoginPage;
