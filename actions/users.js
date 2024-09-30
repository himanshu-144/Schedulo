"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";

export  async function updateUsername(username) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await prisma.user.findUnique({
    where:{
      username
    }
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Username is already taken");
  }

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  await clerkClient.users.updateUser(userId, {
    username,
  });

  return { success: true };
}

export  async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });
  return user;
}

