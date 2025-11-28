"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useStudentContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()

  const { studentDetails, registerStudent, state } = useStudentContract()

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [course, setCourse] = useState("")

  const handleRegister = async () => {
    await registerStudent(name, age, course)
    setName("")
    setAge("")
    setCourse("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Student ID System</h1>

      {/* Register Student */}
      <div className="space-y-3 border p-4 rounded-lg">
        <p className="font-semibold">Register Student</p>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full p-2 border rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          className="w-full p-2 border rounded"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={state.isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {state.isLoading ? "Registering..." : "Register Student"}
        </button>
      </div>

      {/* Display Student Details */}
      <div className="border p-4 rounded-lg">
        <p className="font-semibold mb-3">My Details</p>

        {studentDetails ? (
          <div className="space-y-1">
            <p><strong>Name:</strong> {studentDetails.name}</p>
            <p><strong>Age:</strong> {studentDetails.age}</p>
            <p><strong>Course:</strong> {studentDetails.course}</p>
            <p><strong>Student ID:</strong> {studentDetails.studentId}</p>
          </div>
        ) : (
          <p>No details found. Register first.</p>
        )}
      </div>

      {/* TX Status */}
      {state.hash && (
        <div className="border p-4 rounded">
          <p className="text-sm break-all">{state.hash}</p>
          {state.isConfirming && <p className="text-blue-500">Confirming...</p>}
          {state.isConfirmed && <p className="text-green-500">Confirmed!</p>}
        </div>
      )}

      {state.error && (
        <div className="border p-4 rounded text-red-500">
          Error: {state.error.message}
        </div>
      )}
    </div>
  )
}

export default SampleIntregation
