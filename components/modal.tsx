import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  PressEvent,
} from "@heroui/react";
import { ChangeEvent, useEffect, useState } from "react";

import { User } from "@/types";
import { DownArrowIcon, UpArrowIcon } from "@/app/UI/icons";
import { updateMemesCookies } from "@/config/cookie";

export default function ModalMemes({
  user,
  handleChangeMemes,
}: {
  user: User;
  handleChangeMemes: (memeInputs: User, userId: number) => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [memeInputs, setMemeInputs] = useState<User>({
    id: user.id,
    title: user.title,
    url: user.url,
    likes: user.likes,
  });

  useEffect(() => {
    updateMemesCookies(memeInputs);
  }, [memeInputs]);

  const handleValidateURL = (url: string) => {
    const regex = /(http|https):\/\/[^ "]+$/;

    return regex.test(url);
  };

  const handleClose = () => {
    setMemeInputs(user);
    updateMemesCookies(user);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputField: string
  ) => {
    if (inputField === "url" && !handleValidateURL(inputField)) {
      alert("Invalid URL");
    }
    setMemeInputs((prev) => ({
      ...prev,
      [inputField]: e.target.value,
    }));
  };

  const handleClickBtn = (e: PressEvent, action: string) => {
    setMemeInputs((prev) => ({
      ...prev,
      likes: action === "increment" ? prev.likes + 1 : prev.likes - 1,
    }));
  };

  return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Memes
              </ModalHeader>
              <ModalBody>
                <p>Properties</p>
                <div className="flex flex-col gap-2">
                  <p>ID: {memeInputs.id}</p>
                  <div>
                    <p>Title:</p>
                    <Input
                      defaultValue={memeInputs.title}
                      id="title"
                      required={true}
                      type="text"
                      onChange={(e) => handleChange(e, "title")}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <p>URL:</p>
                    <Input
                      defaultValue={"http://"}
                      id="url"
                      required={true}
                      type="text"
                      value={memeInputs.url}
                      onChange={(e) => handleChange(e, "url")}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <p>Likes: </p>
                    <Button
                      isIconOnly
                      aria-label="Like Down"
                      color="danger"
                      variant="light"
                      onPress={(e) => handleClickBtn(e, "decrement")}
                    >
                      <DownArrowIcon />
                    </Button>
                    {memeInputs.likes}
                    <Button
                      isIconOnly
                      aria-label="Like Up"
                      color="success"
                      variant="light"
                      onPress={(e) => handleClickBtn(e, "increment")}
                    >
                      <UpArrowIcon />
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    handleClose();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="success"
                  variant="light"
                  onPress={() => {
                    handleChangeMemes(memeInputs, user.id);
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
