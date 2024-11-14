'use client'

import React, { useState } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Tooltip
} from "@nextui-org/react";

interface Attendance {
  id: number;
  name: string;
  email: string;
  attended: boolean;
}

export default function AttendanceTable() {
  const [attendance, setAttendance] = useState<Attendance[]>([
    { id: 1, name: "Tony Reichert", email: "tony@example.com", attended: true },
    { id: 2, name: "Zoey Lang", email: "zoey@example.com", attended: false },
    { id: 3, name: "Jane Fisher", email: "jane@example.com", attended: true },
    { id: 4, name: "William Howard", email: "william@example.com", attended: false },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newStudent, setNewStudent] = useState({ name: "", email: "", attended: false });

  const addAttendance = () => {
    if (newStudent.name && newStudent.email !== "") {
      setAttendance([...attendance, { ...newStudent, id: attendance.length + 1 }]);
      setNewStudent({ name: "", email: "", attended: false });
      onClose();
    }
  }

  const toggleAttendance = (id: number) => {
    setAttendance(
      attendance.map((student) => 
        student.id === id ? { ...student, attended: !student.attended } : student
      )
    );
  }

  const deleteAttendance = (id: number) => {
    setAttendance(attendance.filter(student => student.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Management</h1>
        <Button color="primary" onPress={onOpen}>Add New Student</Button>
      </div>

      <Table aria-label="Attendance table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ATTENDED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {attendance.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>
              <Button
                color={student.attended ? "success" : "danger"} // Cambié "error" por "danger"
                onPress={() => toggleAttendance(student.id)}
              >
                {student.attended ? "Yes" : "No"}
              </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="Delete student">
                    <Button
                      isIconOnly
                      size="sm"
                      color="danger"
                      variant="light"
                      onPress={() => deleteAttendance(student.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              placeholder="Enter student name"
              value={newStudent.name}
              onChange={(e: any) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <Input
              label="Email"
              placeholder="Enter student email"
              value={newStudent.email}
              onChange={(e: any) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={addAttendance}>
              Add Student
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}
