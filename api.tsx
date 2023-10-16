import { IPost, IComment, IUser } from "./type/type";

const baseURL = "https://gorest.co.in/public/v2";
const bearerToken =
  "4ceb265e9fe82f4be24bf6194ea24e5fb34eadd82b5f41fd846b61f9524fb117";

// export interface IResponsePost {
//   data: IPost[]
// }

export const getAllPost = async (
  number_perpage: number,
  page: number,
  query: string
): Promise<IPost[]> => {
  const res = await fetch(
    `${baseURL}/posts?per_page=${number_perpage}&page=${page}&body=${query}`,
    {
      next: { revalidate: 0 },
    }
  );
  // const data: IPost[] = await res.json();
  // const header: number = parseInt(res.headers.get("X-Pagination-Pages"));
  return await res.json()
};

export const getAllComment = async (): Promise<IComment[]> => {
  const res = await fetch(`${baseURL}/comments`, {
    next: { revalidate: 0 },
  });
  return await res.json();
};

export const getAllUser = async (
  number_perpage: number,
  page: number,
  query: string
): Promise<IUser[]> => {
  const res = await fetch(
    `${baseURL}/users?per_page=${number_perpage}&page=${page}&name=${query}`,
    {
      next: { revalidate: 0 },
    }
  );
  return await res.json();
};

export const getUserDetail = async (id: number) => {
  const res = await fetch(`${baseURL}/users/${id}`, {
    next: { revalidate: 0 },
  });
  return await res.json();
};

export const getCommentByPostId = async (id: number) => {
  const res = await fetch(`${baseURL}/posts/${id}/comments`, {
    next: { revalidate: 0 },
  });
  return await res.json();
};

export const postUser = async (
  name: string,
  email: string,
  gender: "male" | "female",
  status: "active" | "inactive"
) => {
  const data = {
    name: name,
    email: email,
    gender: gender,
    status: status,
  };
  const res = await fetch(`${baseURL}/users`, {
    method: "POST",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${baseURL}/users/${id}`, {
    method: "DELETE",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  return res;
};

export const editUser = async (
  id: number,
  name: string,
  email: string,
  gender: "male" | "female",
  status: "active" | "inactive"
) => {
  const data = {
    name: name,
    email: email,
    gender: gender,
    status: status,
  };
  const res = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(data)
  });
};
