"use client";

import { Card, CardBody, CardFooter, Image, Link } from "@heroui/react";
import { useEffect, useState } from "react";

import { data } from "@/data";
import { User } from "@/types";
import { getMemesCookies, setMemesCookies } from "@/config/cookie";

const initilizeRandomLikes = (data: User[]) => {
  return data.map((meme) => ({
    ...meme,
    likes: Math.floor(Math.random() * 100),
  }));
};

export default function ListMemes() {
  const [memes, setMemes] = useState<User[]>([]);

  useEffect(() => {
    const fetchMemes = async () => {
      if ((await getMemesCookies()) === null) {
        const dataMeme = initilizeRandomLikes(data);

        setMemes(dataMeme);
        setMemesCookies(dataMeme);
      } else {
        const dataMeme = await getMemesCookies();

        if (dataMeme) {
          setMemes(Array.isArray(dataMeme) ? dataMeme : [dataMeme]);
          setMemesCookies(Array.isArray(dataMeme) ? dataMeme : [dataMeme]);
        }
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="text-3xl font-bold">List of Memes</h1>
      <p className="text-lg">This is a list of memes</p>

      <div className="gap-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 pt-4">
        {memes.map((item, index) => (
          <Card key={index} shadow="sm">
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[240px] sm:h-[300px] md:h-[240px] lg:h-[300px]"
                radius="lg"
                shadow="sm"
                src={item.url}
                width="100%"
              />
            </CardBody>
            <CardFooter className="flex-col text-small items-start justify-between p-2">
              <div className="flex flex-row gap-2">
                <b>{item.title}</b>
              </div>
              <div className="flex flex-row gap-2 items-center justify-between">
                <p className="text-end text-default-500">
                  Likes:&nbsp;
                  {item.likes}
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <Link href={item.url} target="_blank">
                  Open
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
