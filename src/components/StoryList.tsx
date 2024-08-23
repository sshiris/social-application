"use client";

import { addStory } from "@/lib/actions";
import { useAuth, useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & { user: User };

const StoryList = ({ stories }: { stories: StoryWithUser[] }) => {
  const { isLoaded, user } = useUser();
  if (!isLoaded && !user) return "Loading...";
  if (!user && isLoaded) return null;

  const [storyList, setStoryList] = useState<StoryWithUser[]>(stories);
  const [img, setImg] = useState<any>();

  const add = async () => {
    if (!img?.secure_url) return;

    addOptimiticStories({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: user.id,
      user: {
        id: user.id,
        username: "Sending...",
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
      const createdStory = await addStory(img.secure_url);
      setStoryList((pre) => [createdStory!, ...pre]);
    } catch (error) {}
  };

  const [optimisticStories, addOptimiticStories] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  return (
    <>
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                className="w-20 h-20 rounded-full ring-2 object-cover"
                width={80}
                height={80}
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="text-xs text-white bg-blue-500 p-1 rounded-md">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a Story</span>
              )}

              <div className="absolute top-1 text-6xl text-gray-200">+</div>
            </div>
          );
        }}
      </CldUploadWidget>

      {optimisticStories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            className="w-20 h-20 rounded-full ring-2"
            width={80}
            height={80}
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
