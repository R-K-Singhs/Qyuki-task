import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HStack, } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { auth } from "../firebase";
import React, { useState } from "react";
import Profile from "./Profile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    auth.signOut();
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w="100%"
        position={"fixed"}
        bgGradient="linear(to-l, #808080,#DD6B20)"
        p={2}
        px={4}
        textAlign={"right"}
      >
        <Avatar src="https://bit.ly/sage-adebayo" />

        <HStack>
          <Button
            colorScheme="orange"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Profile
          </Button>
          <Button colorScheme="orange" onClick={logout}>
            <Link to="/login">Logout</Link>
          </Button>
        </HStack>
      </Box>
      <Profile isOpen={isOpen} setIsopen={setIsOpen} />
    </div>
  );
};

export default Navbar;
