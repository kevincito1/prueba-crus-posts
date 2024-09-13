"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IPosts } from "@/app/interfaces/interfaces";
import { postsURL } from "@/app/controllers/endpoints";

const PostsPage: React.FC = () => {
  const router = useRouter();
 
  
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("no estas autenticado, debes iniciar sesión");
      router.push("./login");
    }
  

  const name: string | null = sessionStorage.getItem("name");

  const handleSubmit = async (): Promise<void> => {
    const response: Response = await fetch(postsURL);
    const data = await response.json();
    setPosts(data.posts);
  };

  const [posts, setPosts] = useState<IPosts[]>([]);

  const handleNewPost = (): void => {
    router.push("./createPosts");
  };

  const handleLogout = ():void => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    router.push("./login");
  };  

  const handleDelete = async (postId: string): Promise<void> => { 
    const response = await fetch(`${postsURL}/${postId}`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
     
      setPosts(posts.filter(post => post.id?.toString() !== postId)); 
    } else {
      console.error("Error al eliminar el post");
    }
  };

  const handleEdit = (post: IPosts) => {
    sessionStorage.setItem('idPost', post.id?.toString() || "");
    router.push('./editPosts')
  };

  return (
    <div>
      <h1>hola bienvenido {name}</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      <button onClick={handleSubmit}>Ver Posts</button>
      <button onClick={handleNewPost}>Crear un Nuevo Post</button>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <button onClick={()=>handleEdit}>Editar</button>
            <button onClick={() => handleDelete(post.id?.toString() || "")}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
