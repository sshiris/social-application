"use client";

import { addComment } from "@/lib/actions";
import { useClerk, useUser } from "@clerk/nextjs";
import { Comment, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type CommentWithUser = Comment & { user: User };

const CommentList = ({
  postId,
  comments,
}: {
  postId: number;
  comments: CommentWithUser[];
}) => {
  const { user } = useUser();
  const [des, setDes] = useState("");
  const [commentsState, setCommentsState] = useState(comments);

  const add = async () => {
    if (!user || !des) return;

    addOptimisticComments({
      id: Math.random(),
      desc: des,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createComment = await addComment(postId, des);
      setCommentsState((pre) => [createComment, ...pre]);
    } catch (error) {}
  };

  const [optimisticComments, addOptimisticComments] = useOptimistic(
    commentsState,
    (state, value: CommentWithUser) => [value, ...state]
  );
  return (
    <div className="">
      {/* WRITE */}
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 cursor-pointer object-cover rounded-full"
          />
          <form
            action={add}
            className="flex flex-1 px-6 py-2 w-full items-center justify-between bg-slate-100 rounded-xl text-sm"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-transparent outline-none"
              onChange={(event) => setDes(event.target.value)}
            ></input>
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer "
            />
          </form>
        </div>
      )}

      {/* Comments */}
      {optimisticComments.map((comment) => (
        <div className="flex gap-4 justify-between mt-6" key={comment.id}>
          {/* AVARTAR */}
          <Image
            src={comment.user.avatar || "/noAvatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 cursor-pointer object-cover rounded-full"
          />

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">
              {comment.user.name && comment.user.surname
                ? comment.user.name + " " + comment.user.surname
                : comment.user.username}
            </span>
            <p>{comment.desc}</p>
            <div className="flex items-center gap-8 text-gray-500 text-xs mt-2">
              <div className="flex gap-4 items-center">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="cursor-pointer w-3 h-3"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* OPTIONS */}
          <Image
            src="/more.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
