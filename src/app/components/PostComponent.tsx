"use client";

import { useState } from "react";
import { getAllComment, getCommentByPostId, getUserDetail } from "../../../api";
import { IComment, IPost, IUser } from "../../../type/type";

interface PostProps {
  post: IPost[];
  owner: IUser[];
}

const PostComponent: React.FC<PostProps> = ( {post, owner} ) => {
  //   console.log(post);
  //   console.log(owner);
  const [comment, setcomments] = useState<IComment[]>();
  const [isClick, setIsClick] = useState<number>();
  const findOwnerName = (userId: number) => {
    // const findUserId = async (id: number) => {
    //     const owner: IUser = await getUserDetail(id)
    //     if(owner.name){
    //         return owner.name
    //     } else{
    //         return "Anonymous"
    //     }
    // }
    // return findUserId(userId)
    const foundOwner = owner.find((user) => user.id === userId);
    return foundOwner ? foundOwner.name : "Anonymous";
  };

  const findUserById = async (userId: number)  => {
    const data = await getUserDetail(userId)
    return data? data.name : "Anonymous"
  }

  const findComment = async (id: number) => {
    const komen = await getCommentByPostId(id);
    setIsClick(id);
    setcomments(komen);
    console.log(komen);
  };
  //   findComment(76019)
  return (
    <div>
      {/* <button onClick={() => findComment(76019)}>CEK</button> */}
      {post?.map((item: IPost) => {
        // findComment(item.id)
        // console.log(comment)
        return (
          <div
            key={item.id}
            className="p-4 bg-slate-900 rounded-md mb-5 items-center"
          >
            <p className="text-sm mb-2 font-bold">
              {findOwnerName(item.user_id)}
            </p>
            <p className="text-xl font-bold mb-2 border-b text-blue-600">
              {item.title}
            </p>
            <p className="text-xs text-justify">{item.body}</p>
            <div className="my-3 ">
              {/* <p className="font-bold text-xs">Comments (0)</p> */}
              <div>
                <button
                  className="font-bold text-xs"
                  type="button"
                  onClick={() => findComment(item.id)}
                >
                  Comment
                </button>
                {isClick === item.id
                  ? comment?.length !== 0
                    ? comment?.map((komen) => {
                        return (
                          <div className="px-2 my-3" key={komen.id}>
                            <div className=" bg-slate-800 px-3 py-2 rounded-md">
                              <p className="text-xs font-bold text-blue-600">
                                {komen.name}
                              </p>
                              <p className="text-xs">{komen.body}</p>
                            </div>
                          </div>
                        );
                      })
                    : <p className="w-full text-center text-xs my-3 text-gray-500">No Comment</p>
                  : ""}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostComponent;
