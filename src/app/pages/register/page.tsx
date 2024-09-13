"use client";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { register } from "@/app/controllers/endpoints";
import { IRegister } from "@/app/interfaces/interfaces";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const dataRegister: IRegister = { name, email, password };
    const response = await fetch(register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataRegister),
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      router.push("./login");
    } else {
      alert("Error al crear el usuario");
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          value={name}
          required
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
