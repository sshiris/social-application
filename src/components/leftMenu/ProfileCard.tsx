import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const ProfileCard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  console.log(user);
  if (!user) return null;
  return (
    <div className="bg-white shadow-md p-4 text-sm rounded-lg flex flex-col gap-6">
      <div className="relative h-20">
        <Image
          src={user.cover || "/noCover.png"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="rounded-full object-cover  -bottom-6 absolute w-12 h-12 left-0 right-0 m-auto
          ring-1 ring-white z-10"
        />
      </div>
      <div className="flex flex-col gap-2 items-center h-20">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Image
              src="https://images.pexels.com/photos/27275527/pexels-photo-27275527/free-photo-of-cappadocia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover  w-4 h-4 
          ring-1 ring-white"
            />
            <Image
              src="https://images.pexels.com/photos/27275527/pexels-photo-27275527/free-photo-of-cappadocia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover  w-4 h-4 
          ring-1 ring-white"
            />
            <Image
              src="https://images.pexels.com/photos/27275527/pexels-photo-27275527/free-photo-of-cappadocia.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover  w-4 h-4 
          ring-1 ring-white"
            />
          </div>
          <span className="text-xs text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md text-xs">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
