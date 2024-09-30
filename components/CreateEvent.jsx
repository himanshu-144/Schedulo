"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "./ui/drawer";
import { Button } from "./ui/button";
import EventForm from "./EventForm"

 const CreateEventDrawer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
      router.replace(window?.location.pathname);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm
            onSubmitForm={() => {
              handleClose();
            }}
          />
          <DrawerFooter className="px-6">
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEventDrawer