import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Addemployee from "../components/AddEmployee";
import { Box, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { toastSuccess } from "../utils/toast";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const Dashboard = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState({});
  const [employees, setemployees] = useState([]);

  function getEmployeesData() {
    db.collection("employees")
      .get()
      .then((querySnapshot) => {
        let empList = [];
        querySnapshot.forEach((doc) => {
          empList.push({ id: doc.id, ...doc.data() });
        });
        const currUID = currentUser.uid;
        if (currUID && empList.length > 0) {
          let currUserEmp = empList.filter((emp) => emp.uid === currUID);
          console.log(currUserEmp);
          setemployees(currUserEmp);
        } else {
          getEmployeesData();
        }
      });
  }

  function deleteEmployee(doc_id) {
    db.collection("employees")
      .doc(doc_id)
      .delete()
      .then(() => {
        toastSuccess(toast, "Employee successfully deleted!");
        getEmployeesData();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setcurrentUser(user);
    getEmployeesData();
  }, [isOpen]);

  useEffect(() => {
    getEmployeesData();
  }, [currentUser]);

  return (
    <Box position={"relative"}>
      <Box position={"absolute"} left={0} top={0} w="100%">
        <Navbar />
        <br />
        <br />
        <br />
        <Box
          rounded={2}
          border="1px solid orange"
          m="2"
          height="85vh"
          overflowY={"auto"}
        >
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>Sr No.</Th>
                <Th>Name</Th>
                <Th>Destination </Th>
                <Th>CTC </Th>
                <Th>Date Of Joining </Th>
                <Th>Action </Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees.map((data, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{data.name}</Td>
                  <Td>{data.destination}</Td>
                  <Td>{data.CTC}</Td>
                  <Td>{data.joining_date}</Td>
                  <Td>
                    <DeleteIcon
                      cursor={"pointer"}
                      color="red"
                      width={30}
                      onClick={() => {
                        deleteEmployee(data.id);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {employees.length <= 0 && (
            <Box w={"100%"}>
              <Text
                mt="100"
                alignItems={"center"}
                textAlign="center"
                bgGradient="linear(to-l, #808080,#DD6B20)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
              >
                Data not found.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        position={"fixed"}
        right={6}
        bottom={10}
        display={"flex"}
        flexDirection="row-reverse"
      >
        <Button
          boxShadow="dark-lg"
          leftIcon={<AddIcon />}
          colorScheme="orange"
          variant="solid"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Add Employee
        </Button>
      </Box>
      <Addemployee isOpen={isOpen} setIsopen={setIsOpen} />
    </Box>
  );
};

export default Dashboard;
