import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
const Navbar = () => {
  return (
    <div className="h-16  flex justify-between px-5 lg:px-12 shadow items-center">
      <Link to={"/"}>
        <div className="text-2xl font-bold">Medium</div>
      </Link>
      <div className="hidden md:block">
        <div className="flex items-center gap-x-3 lg:gap-x-6">
          <div className="font-bold">
            {" "}
            Hello, {localStorage.getItem("name")}
          </div>
          <Link to={"/createBlog"} className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon w-6 ml-2"
              viewBox="0 0 512 512"
            >
              <path
                d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" />
            </svg>{" "}
            Write
          </Link>
          <Link to={"/profile"}>
            <div> Profile </div>
          </Link>
        </div>
      </div>
      <div className="block md:hidden">
        <PlacementExample />
      </div>
    </div>
  );
};

export default Navbar;

function PlacementExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="gray" onClick={onOpen}>
        <svg
          className="h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      </Button>
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col items-center w-full space-y-3">
              <Link to={"/"} onClick={onClose}>
                <div className="hover:border hover:bg-slate-100  w-72 text-center py-3 shadow hover:shadow-md rounded-md">
                  Home
                </div>
              </Link>{" "}
              <Link to={"/createBlog"} onClick={onClose}>
                <div className="hover:border hover:bg-slate-100  w-72 text-center py-3 shadow hover:shadow-md rounded-md">
                  Write
                </div>
              </Link>
              <Link to={"/profile"} onClick={onClose}>
                <div className="hover:border hover:bg-slate-100  w-72 text-center py-3 shadow hover:shadow-md rounded-md">
                  Profile
                </div>
              </Link>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme="blue"
              onClick={() => localStorage.removeItem("token")}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
