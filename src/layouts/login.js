import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { firebase, auth } from "../firebase";
import { useParams, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const Login = () => {
  let navigate = useNavigate();
  // Inputs
  const [mobile, setMobile] = useState("");
  const [otp, setOTP] = useState("");
  const [final, setfinal] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const [isLogin, setIsLogin] = useState(true);

  //loginHandler to Sent OTP
  const loginHandler = () => {
    if (mobile === "" || mobile.length < 10) return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(`+91${mobile}`, verify)
      .then((result) => {
        setfinal(result);
        setIsOpen(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null || otp.length !== 6) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log(result.user);
        localStorage.setItem("user", JSON.stringify(result.user))
        onClose();
        navigate("/dashboard");
      })
      .catch((err) => {
        onClose();
        alert("Wrong code");
      });
  };

  return (
    <Box h={"100vh"}
      bg="gray">
      <Box
        display={"flex"}
        justifyContent="center"
        h={"100%"}
        w="100%"

      >
        <Box
          boxShadow="xs"
          p="6"
          rounded="md"
          bg="white"
          w={"50%"}
          minW={360}
          m="3%"
          maxH={"500px"}
          maxWidth={"500px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          p={6}
        >
          <Box>
            <Text
              bgGradient="linear(to-l, #808080,#DD6B20)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              {isLogin ? "Login" : "Register"}
            </Text>
            <hr />
          </Box>
          <Box>
            <Box display={"flex"} mb="2" justifyContent="center">
              <div id="recaptcha-container"></div>
            </Box>
            <FormLabel htmlFor="mobile_no" color={"#BF713E"}>
              Mobile No.
            </FormLabel>
            <Input
              id="mobile_no"
              type={"number"}
              variant={"unstyled"}
              border="1px solid orange"
              p="2"
              placeholder="Enter your mobile"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Button
              colorScheme="orange"
              onClick={loginHandler}
              isLoading={isOpen}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Box display={"flex"} flexDirection="row-reverse">
              <Text
                fontSize="xs"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
                color="blue.500"
                as={"i"}
                cursor="pointer"
                _hover={{
                  color: "teal.500",
                  fontWeight: "bold",
                }}
              >
                {isLogin ? "Register now!" : "All ready have account!"}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <AlertDialog isOpen={isOpen} >
        <AlertDialogOverlay>
          <AlertDialogContent mx={2}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text
                bgGradient="linear(to-l, #808080,#DD6B20)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
              >
                Enter OTP
              </Text>
              <hr />
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack
                align={"center"}
                textAlign="center"
                display={"flex "}
                justifyContent="center"
              >
                <PinInput
                  onChange={(value) => {
                    setOTP(value);
                  }}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="orange" onClick={ValidateOtp}>
                Verify OTP
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Login;
