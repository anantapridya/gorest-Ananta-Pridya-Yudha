"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserComponent from "../components/UserComponent";
import { editUser, getAllUser, postUser } from "../../../api";
import DataPagination from "../components/DataPagination";
import { IUser } from "../../../type/type";
import { Alert, Radio } from "antd";
import { render } from "react-dom";
const RadioGroup = Radio.Group;

export default function User() {
  const [dataUser, setDataUser] = useState<IUser[]>();
  const [query, setQuery] = useState<string>("");
  const [pageData, setPageData] = useState<number>(1);
  const [pageSizeData, setPageSizeData] = useState<number>(10);
  const [id, setId] = useState<number>()
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<"male" | "female" | "">();
  const [status, setStatus] = useState<"active" | "inactive" | "">();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUser(pageSizeData, pageData, query);
      //   const user: IUser[] = await getAllUser(50, 1)
      // const totalPages = parseInt(getAllPost.headers.get("X-Pagination-Pages"));
      // const totalPages = parseInt(response.headers.get("X-Pagination-Pages"));
      // const totalPages = parseInt(data.get("X-Pagination-Pages"))
      console.log(data);
      setDataUser(data);
      // setTotalPages(Number(data.header))
      //   setDataPost(data.data)
      //   setDataUser(user)
    };
    fetchData();
    // console.log(totalPages)
  }, [pageData, pageSizeData, query, isChange]);

  const handleClearInput = () => {
    setName("");
    setEmail("");
    setGender("");
    setStatus("");
  };

  useEffect(() => {
    if (name && email && gender && status) {
      setIsComplete(true);
    } else setIsComplete(false);
    console.log(name);
    console.log(email);
    console.log(gender);
    console.log(status);
    console.log(isComplete);
  }, [name, email, gender, status]);

  const handlePost = async () => {
    const response = await postUser(name, email, gender, status);
    console.log(response);
    setIsChange(!isChange)
    // (response.id ? (<Alert message={`User: ${response.id} Berhasil di Buat`} type="success" banner closable />) : (<Alert message="Error" type="error" banner closable />) )
    if(response.id){
      alert(`User: ${response.id} berhasil dibuat`)
      // return(
      //   <Alert message={`User: ${response.id} Berhasil di Buat`} type="success" banner closable />
      // )
    } else{
      setIsChange(!isChange)
      alert(`${response[0].field}: ${response[0].message}`)
      // return(
      //   <Alert message={`User: Berhasil di Buat`} type="success" banner closable />
      // )
    }
    handleClearInput();
  };

  const handleEdit = async() => {
    const res = await editUser(id, name, email, gender, status);
    console.log(res);
    setIsChange(!isChange)
  }

  const handlePaginationChange = async (page: number, pageSize: number) => {
    setPageData(page);
    setPageSizeData(pageSize);
    console.log({ pageData, pageSizeData });
  };
  const handleDataChange = async(dataChange: any) => {
    console.log(dataChange)
    setIsChange(!isChange)
    setIsEdit(dataChange.isEdit)
    console.log(isEdit)
    setAddUser(true)
    setId(dataChange.id)
    setName(dataChange.name);
    setEmail(dataChange.email);
    setGender(dataChange.gender);
    setStatus(dataChange.status);
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      {/* <button className="absolute top-10 left-24">Back</button> */}
      {/* <Alert message="Berhasil di Buat" type="success" banner closable /> */}
      <div className="w-[800px] flex flex-col justify-center items-center ">
        <div>
          <Navbar />
        </div>
        <p className="font-bold text-3xl my-8">Users</p>
        <div className="w-full">
          <button
            onClick={() => {
              setAddUser(!addUser);
              handleClearInput();
              setIsEdit(false)
            }}
            className={`${
              addUser ? "bg-red-700" : " bg-blue-800"
            } p-3 rounded-xl mb-3 font-bold`}
          >
            {addUser ? "Close" : "Add User"}
          </button>
          <div
            className={`grid grid-cols-4 gap-y-3 p-4 rounded-xl my-3 bg-slate-800 ${
              addUser ? "" : "hidden"
            }`}
          >
            <p>Name</p>
            <input
              placeholder="Name"
              className="col-span-3 text-black p-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p>Email</p>
            <input
              placeholder="Email"
              className="col-span-3 text-black p-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>Gender</p>
            <div className="col-span-3 ">
              <RadioGroup
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <Radio value="" defaultChecked className="hidden"></Radio>
                <Radio value="male" className="text-white">
                  Male
                </Radio>
                <Radio value="female" className="text-white">
                  Female
                </Radio>
              </RadioGroup>
            </div>
            <p>Status</p>
            <div className="col-span-3">
              <RadioGroup
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <Radio value="active" className="text-white">
                  Active
                </Radio>
                <Radio value="inactive" className="text-white">
                  Inactive
                </Radio>
              </RadioGroup>
              {/* <input type="radio" name="status" />
              <span>Active</span>
              <input type="radio" name="status" />
              <span>Inactive</span> */}
            </div>
            <button
              className={`col-span-4 mt-5 py-2 font-bold ${
                isComplete ? "bg-blue-800" : "bg-gray-500"
              } ${isEdit? " hidden " : "inline"}`}
              onClick={() => handlePost()}
              disabled={!isComplete}
            >
              Create
            </button>
            <button
              className={`col-span-4 mt-5 py-2 font-bold ${
                isComplete ? "bg-yellow-600" : "bg-gray-500"
              } ${isEdit? " inline " : " hidden "} `}
              onClick={() => handleEdit()}
              disabled={!isComplete}
            >
              EDIT
            </button>
          </div>
        </div>
        <input
          className="text-black p-2 w-full mb-4"
          placeholder="Search User"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <UserComponent user={dataUser} onChange={handleDataChange} />
        {/* <PostComponent post={dataPost} owner={dataUser} /> */}
        <div className="w-full flex justify-center bg-white p-1 mt-5">
          <DataPagination onChangePagination={handlePaginationChange} />
          {/* <Pagination defaultCurrent={1} current={2} total={500} /> */}
        </div>
      </div>
    </div>
  );
}
