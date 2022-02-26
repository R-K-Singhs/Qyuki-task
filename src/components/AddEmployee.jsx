import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { db } from "../firebase";
import { useToast } from "@chakra-ui/react";
import { toastError, toastSuccess } from "../utils/toast";
import { FormLabel } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const Addemployee = ({ isOpen, setIsopen }) => {
  const toast = useToast();
  const [selectedStates, setSelectedStates] = useState([]);
  const [editable, seteditable] = useState(true);
  const [currentUser, setcurrentUser] = useState({});

  const [formData, setformData] = useState({
    name: "",
    destination: "",
    CTC: "",
    joining_date: "",
  });

  function inputHandler(e) {
    const { name, value } = e.target;
    setformData((preval) => ({
      ...preval,
      [name]: value,
    }));
  }

  const addEmployee = () => {
    db.collection("employees")
      .add({ uid: currentUser.uid, ...formData })
      .then((docRef) => {
        toastSuccess(toast, "Added successfully!");
        setIsopen(false);
        setformData({
          name: "",
          destination: "",
          CTC: "",
          salary: "",
          joining_date: "",
        });
      })
      .catch((error) => {
        toastError(toast, "Error");
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setcurrentUser(user);
  }, [isOpen]);

  return (
    <div>
      <AlertDialog isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent mx={2}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text
                bgGradient="linear(to-l, #808080,#DD6B20)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
              >
                Add Employee
              </Text>
              <hr />
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box mb={2}>
                <FormLabel htmlFor="name" color={"#BF713E"}>
                  Name
                </FormLabel>
                <Input
                  disabled={!editable}
                  id="name"
                  name="name"
                  value={formData.name}
                  type={"text"}
                  variant={"unstyled"}
                  border="1px solid orange"
                  p="2"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </Box>
              <Box mb={2}>
                <FormLabel htmlFor="joining_date" color={"#BF713E"}>
                  Joining Date
                </FormLabel>
                <Input
                  disabled={!editable}
                  id="joining_date"
                  name="joining_date"
                  value={formData.joining_date}
                  type={"date"}
                  variant={"unstyled"}
                  border="1px solid orange"
                  p="2"
                  placeholder="Enter destination"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </Box>
              <Box mb={2}>
                <FormLabel htmlFor="destination" color={"#BF713E"}>
                  CTC
                </FormLabel>
                <Input
                  disabled={!editable}
                  id="CTC"
                  name="CTC"
                  value={formData.CTC}
                  type={"text"}
                  variant={"unstyled"}
                  border="1px solid orange"
                  p="2"
                  placeholder="Enter CTC"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </Box>
              <Box mb={2}>
                <FormLabel htmlFor="destination" color={"#BF713E"}>
                  Destination
                </FormLabel>
                <Box border="1px solid orange" p="2" rounded={8}>
                  <Select
                    disabled={!editable}
                    variant={"unstyled"}
                    id="destination"
                    placeholder="Select destination"
                    name="destination"
                    onChange={(e) => {
                      inputHandler(e);
                    }}
                  >
                    <option value={"Software developer"}>
                      Software Developer
                    </option>
                    <option value={"ReactJS developer"}>
                      ReactJS Developer
                    </option>
                    <option value={"NodeJS developer"}>NodeJS Developer</option>
                    <option value={"Full stack developer"}>
                      Full stack Developer
                    </option>
                  </Select>
                </Box>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <HStack>
                {!editable ? (
                  <Button
                    colorScheme="orange"
                    onClick={() => {
                      seteditable(true);
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button colorScheme="orange" onClick={addEmployee}>
                    Save
                  </Button>
                )}

                <Button
                  colorScheme="orange"
                  onClick={() => {
                    setIsopen(false);
                  }}
                >
                  Cancel
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default Addemployee;
