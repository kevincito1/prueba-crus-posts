"use client";
import { FormEvent, useState } from "react";
import { postsURL } from "@/app/controllers/endpoints";
import { IPosts } from "@/app/interfaces/interfaces";
import { useRouter } from "next/navigation";

const CreatePostsPage: React.FC = () => {
  const userId = sessionStorage.getItem("id");
  const router = useRouter()

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [user_id, setUserId] = useState<number | null>(
    userId ? parseInt(userId) : null
  );

  const handleCreatePost = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const dataPosts: IPosts = {
      title,
      description,
      user_id: user_id !== null ? user_id : 0,
    };
    const response: Response = await fetch(postsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPosts),
    });
    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    }
    setTitle("");
    setDescription("");
    router.push('./posts')
  };

  return (
    <div>
      <form onSubmit={handleCreatePost}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePostsPage;
