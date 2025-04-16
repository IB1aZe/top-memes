"use client";

import React, { Key, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Link } from "@heroui/link";

import { data } from "@/data";
import ModalMemes from "@/components/modal";
import { User } from "@/types";
import { getMemesCookies, setMemesCookies } from "@/config/cookie";

const initilizeRandomLikes = (data: User[]) => {
  return data.map((meme) => ({
    ...meme,
    likes: Math.floor(Math.random() * 100),
  }));
};

const columns = [
  { name: "ID", uid: "id" },
  { name: "TITLE", uid: "title" },
  { name: "IMAGE", uid: "url" },
  { name: "LIKES", uid: "likes" },
  { name: "ACTIONS", uid: "actions" },
];

export default function TableMemes() {
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

  const handleChangeMemes = (memeInputs: User, userId: number) => {
    setMemes((prev) => {
      return prev.map((el) =>
        el.id === userId ? { ...el, ...memeInputs } : el
      );
    });
  };

  const renderCell = useCallback((user: User, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p
              key={user.id}
              className="text-bold text-sm capitalize text-default-400"
            >
              {user.id}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm text-default-400">{user.title}</p>
          </div>
        );
      case "url":
        return (
          <Link href={user.url} target="_blank">
            Open
          </Link>
        );
      case "likes":
        return (
          <p className="text-bold items text-sm capitalize text-default-400">
            {user.likes}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <ModalMemes handleChangeMemes={handleChangeMemes} user={user} />
          </div>
        );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-3xl font-bold">Table of Memes</h1>
      <p className="text-lg">This is a table of memes</p>
      <br />
      <div className="overflow-x-auto w-full h-full pt-4">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "title" ? "start" : "center"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={memes}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
