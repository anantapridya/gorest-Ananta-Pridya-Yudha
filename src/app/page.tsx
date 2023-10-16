"use client";

import React, { useEffect, useState } from "react";
import { getAllPost, getAllUser } from "../../api";
import { IPost, IUser } from "../../type/type";
import PostComponent from "./components/PostComponent";
import DataPagination from "./components/DataPagination";
import Navbar from "./components/Navbar";

export default function Home() {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataPost, setDataPost] = useState<IPost[] | undefined | any>()
  const [dataUser, setDataUser] = useState<IUser[] | undefined | any>()
  const [pageData, setPageData] = useState<number>(1);
  const [pageSizeData, setPageSizeData] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>()
  const [query, setQuery] = useState<string>("");
  // const [post, setPost] = useState([])
  // const [data, user] = await Promise.all([getAllPost(30, 5), getAllUser(100)]);
  // const user = await getAllUser(50);

  useEffect(() => {
    const fetchData = async () => { 
      const data:IPost[] = await getAllPost(pageSizeData, pageData, query);
      const user: IUser[] = await getAllUser(50, 1, '')
      // const totalPages = parseInt(getAllPost.headers.get("X-Pagination-Pages"));
      // const totalPages = parseInt(response.headers.get("X-Pagination-Pages"));
      // const totalPages = parseInt(data.get("X-Pagination-Pages"))
      console.log(data)
      // setTotalPages(Number(data.header))
      setDataPost(data)
      setDataUser(user)
    };
    fetchData()
    console.log(totalPages)
  },[pageData, pageSizeData, query]);

  const handlePaginationChange = async (page: number, pageSize: number) => {
    // const dataPagi = await getAllPost(page, pageSize);
    setPageData(page);
    setPageSizeData(pageSize)
    console.log({ page, pageSize });
  };
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      {/* <button className="absolute top-10 left-24">Back</button> */}
      <div className="w-[800px] flex flex-col justify-center items-center ">
        <div>
          <Navbar />
        </div>
        <p className="font-bold text-3xl my-8">BLOG</p>
        <input className="text-black p-2 w-full mb-4" placeholder="Search Post" value={query} onChange={(e) => setQuery(e.target.value)} />
        <PostComponent post={dataPost} owner={dataUser} />
        <div className="w-full flex justify-center bg-white p-1">
          <DataPagination onChangePagination={handlePaginationChange} />
          {/* <Pagination defaultCurrent={1} current={2} total={500} /> */}
        </div>
      </div>
    </div>
  );
}
