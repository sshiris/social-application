import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FriendRequestList from "./friendRequestList";

const FriendRequests = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
  if (!requests.length) return null;
  return (
    <div className="bg-white shadow-md p-4 text-sm rounded-lg flex flex-col gap-4">
      {/* Top */}
      <div className="">
        <div className="flex items-center justify-between font-medium ">
          <span className="text-grau-500">Friend Requests</span>
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        </div>
      </div>
      {/* Bottom  */}
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequests;
