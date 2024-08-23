"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) return "Loading...";

  return (
    <div className="bg-white flex p-4 gap-4 rounded-lg justify-between text-sm shadow-md">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="rounded-full w-12 h-12 object-cover"
      />
      {/* POST */}
      <div className="flex-1 ">
        {/* TEXT  */}

        <form
          className="flex gap-4"
          action={(formData) => addPost(formData, img?.secure_url || "")}
        >
          <textarea
            placeholder="What's in your mind?"
            className="bg-slate-100 flex-1 p-2"
            name="description"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className="rounded-full w-5 h-5 object-cover cursor-pointer self-end"
            />
            <AddPostButton />
          </div>
        </form>
        {/* POST OPTIONS */}
        <div className="flex gap-2 items-center mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => {
                    open();
                  }}
                >
                  <Image src="/addimage.png" alt="" width={20} height={20} />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
