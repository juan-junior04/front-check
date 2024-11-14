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

interface Student {
  id: number
  name: string
  email: string
  grade: string
}

export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Tony Reichert", email: "tony@example.com", grade: "A" },
    { id: 2, name: "Zoey Lang", email: "zoey@example.com", grade: "B" },
    { id: 3, name: "Jane Fisher", email: "jane@example.com", grade: "A" },
    { id: 4, name: "William Howard", email: "william@example.com", grade: "C" },
  ])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newStudent, setNewStudent] = useState({ name: "", email: "", grade: "" })

  const addStudent = () => {
    if (newStudent.name && newStudent.email && newStudent.grade) {
      setStudents([...students, { ...newStudent, id: students.length + 1 }])
      setNewStudent({ name: "", email: "", grade: "" })
      onClose()
    }
  }

  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <Button color="primary" onPress={onOpen}>Add New Student</Button>
      </div>

      <Table aria-label="Example table with students">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>GRADE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="Edit student">
                    <Button isIconOnly size="sm" variant="light">
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete student">
                    <Button isIconOnly size="sm" color="danger" variant="light" onPress={() => deleteStudent(student.id)}>
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
              onChange={(e:any) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <Input
              label="Email"
              placeholder="Enter student email"
              value={newStudent.email}
              onChange={(e:any) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <Input
              label="Grade"
              placeholder="Enter student grade"
              value={newStudent.grade}
              onChange={(e:any) => setNewStudent({ ...newStudent, grade: e.target.value })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={addStudent}>
              Add Student
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

function EditIcon() {
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
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  )
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
  )
}