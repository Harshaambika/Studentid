"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface StudentDetails {
  name: string
  age: number
  course: string
  studentId: number
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export const useStudentContract = () => {
  const { address } = useAccount()

  // READ: getMyDetails()
  const { data: detailsRaw, refetch: refetchDetails } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getMyDetails",
    query: {
      enabled: !!address
    }
  })

  const studentDetails: StudentDetails | null = detailsRaw
    ? {
        name: detailsRaw[0],
        age: Number(detailsRaw[1]),
        course: detailsRaw[2],
        studentId: Number(detailsRaw[3])
      }
    : null

  // WRITE
  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      refetchDetails()
    }
  }, [isConfirmed, refetchDetails])

  const registerStudent = async (
    name: string,
    age: string,
    course: string
  ) => {
    if (!name || !age || !course) return

    await writeContractAsync({
      address: contractAddress,
      abi: contractABI,
      functionName: "registerStudent",
      args: [name, BigInt(age), course]
    })
  }

  const state: ContractState = {
    isLoading: isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error
  }

  return {
    studentDetails,
    registerStudent,
    state
  }
}
