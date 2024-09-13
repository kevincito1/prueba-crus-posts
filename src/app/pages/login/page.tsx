"use client";

import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <Link href="pages/register">Crea una cuenta</Link>
    </div>
  );
};

export default LoginPage;
