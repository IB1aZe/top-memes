"use server";

import { cookies } from "next/headers";

import { User } from "@/types";

export const getMemesCookies = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("memes");
  const memes = cookie ? JSON.parse(cookie.value) : null;

  return memes;
};

export const setMemesCookies = async (memes: User[]) => {
  const cookieStore = await cookies();

  cookieStore.set("memes", JSON.stringify(memes));
};

export const deleteMemesCookies = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("memes");

  if (cookie) {
    cookieStore.delete("memes");
  }
};

export const updateMemesCookies = async (meme: User) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("memes");

  if (cookie) {
    const memes = JSON.parse(cookie.value);
    const updatedMemes = memes.map((item: User) =>
      item.id === meme.id ? { ...item, ...meme } : item
    );

    cookieStore.set("memes", JSON.stringify(updatedMemes));
  }
};
