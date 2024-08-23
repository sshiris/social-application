import prisma from "@/lib/client";
import { auth, currentUser } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    return null;
  }

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                followerId: currentUserId,
              },
            },
          },
        },
        {
          userId: currentUserId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-white overflow-scroll p-4 text-xs shadow-md scroll-hidden rounded-lg">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} />
      </div>
    </div>
  );
};

export default Stories;
