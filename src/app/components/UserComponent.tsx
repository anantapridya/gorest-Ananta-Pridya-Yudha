"use client";

import React, { useState } from "react";
import { IUser } from "../../../type/type";
import { deleteUser } from "../../../api";

interface UserProps {
  user: IUser[];
  onChange: any;
}

const UserComponent: React.FC<UserProps> = ({ user, onChange }) => {
  const [isHover, setIsHover] = useState<number>();
  const [isChange, setIsChange] = useState<boolean>(false);

  const handleDelete = async (e: any, id: number) => {
    e.preventDefault();
    const res = await deleteUser(id);
    if (onChange) {
      onChange(id);
    }
    if (!res) {
      alert(res);
    } else {
      alert(res + "error");
    }
  };
  const handleEdit = async (
    e: any,
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
    isEdit: boolean
  ) => {
    e.preventDefault();
    if (onChange) {
      onChange({
        id: id,
        name: name,
        email: email,
        gender: gender,
        status: status,
        isEdit: isEdit
      });
    }
  };
  // const handleUserChange = async (e: any, user: any) => {
  //   e.preventDefault();
  //   console.log(user);
  //   await setIsChange(!isChange);
  // };

  return (
    <div className="w-full flex flex-col gap-y-3">
      {user?.map((item: IUser) => {
        return (
          <div
            className="flex w-full justify-between bg-slate-900 p-4 rounded-xl"
            onMouseEnter={() => setIsHover(item.id)}
            onMouseLeave={() => setIsHover(0)}
          >
            <p className="font-bold text-lg">{item.name}</p>
            <div className="flex gap-x-3">
              {item.status === "active" ? (
                <p className="text-green-500 font-bold text-md">Active</p>
              ) : (
                <p className="text-gray-400 font-bold text-md">Inactive</p>
              )}
              <div className={`${isHover === item.id ? "inline" : "hidden"} `}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(e, item.id);
                  }}
                >
                  Delete
                </button>
                <button onClick={(e) => {
                  e.preventDefault();
                  handleEdit(e, item.id, item.name, item.email, item.gender, item.status, true)
                }}>Edit</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserComponent;
