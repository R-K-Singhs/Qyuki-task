import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { db } from "../firebase";
import { countries, states } from "../constant/constant";
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

const Profile = ({ isOpen, setIsopen }) => {
  const toast = useToast();
  const [selectedStates, setSelectedStates] = useState([]);
  const [editable, seteditable] = useState(false);
  const [currentUser, setcurrentUser] = useState({});

  const [formData, setformData] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
  });

  function inputHandler(e) {
    const { name, value } = e.target;

    if (name === "country") {
      setSelectedStates(states[value.split("-")[1]]);
      setformData((preval) => ({
        ...preval,
        [name]: value.split("-")[1],
      }));
      return;
    } else {
      setformData((preval) => ({
        ...preval,
        [name]: value,
      }));
    }
  }

  const updateProfile = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .set(formData)
      .then((docRef) => {
        toastSuccess(toast, "Profile updated successfully!");
        setIsopen(false);
        seteditable(false);
        console.log("Document written with ID: ", docRef);
      })
      .catch((error) => {
        toastError(toast, "Error");
        console.error("Error adding document: ", error);
      });
  };

  function getProfileData() {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data()) setformData(querySnapshot.data());
      });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setcurrentUser(user);
    setformData((preval) => ({
      ...preval,
      mobile: user.phoneNumber.substr(3),
    }));

    getProfileData();
  }, [isOpen]);

  return (
    <Box>
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
                Profile
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
                <FormLabel htmlFor="country" color={"#BF713E"}>
                  Country
                </FormLabel>
                <Box border="1px solid orange" p="2" rounded={8}>
                  <Select
                    disabled={!editable}
                    variant={"unstyled"}
                    id="country"
                    placeholder="Select country"
                    name="country"
                    onChange={(e) => {
                      inputHandler(e);
                    }}
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country + "-" + index}>
                        {country}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box mb={2}>
                <FormLabel htmlFor="state" color={"#BF713E"}>
                  State
                </FormLabel>
                <Box border="1px solid orange" p="2" rounded={8}>
                  <Select
                    disabled={!editable}
                    id="state"
                    placeholder="Select state"
                    variant={"unstyled"}
                    name="state"
                    onChange={(e) => {
                      inputHandler(e);
                    }}
                  >
                    {selectedStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box mb={2}>
                <FormLabel htmlFor="city" color={"#BF713E"}>
                  City
                </FormLabel>
                <Input
                  disabled={!editable}
                  id="city"
                  name="city"
                  value={formData.city}
                  type={"text"}
                  variant={"unstyled"}
                  border="1px solid orange"
                  p="2"
                  placeholder="Enter city name"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="mobile_no" color={"#BF713E"}>
                  Mobile No.
                </FormLabel>
                <Input
                  disabled
                  id="mobile_no"
                  name="mobile"
                  value={formData.mobile}
                  type={"number"}
                  variant={"unstyled"}
                  border="1px solid orange"
                  p="2"
                  placeholder="Enter your mobile"
                  onChange={(e) => {
                    inputHandler(e);
                  }}
                />
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
                  <Button colorScheme="orange" onClick={updateProfile}>
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
    </Box>
  );
};

export default Profile;
