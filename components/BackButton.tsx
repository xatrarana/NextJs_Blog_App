'use client';
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const BackButton = () => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()} className="btn btn-ghost">
        <ChevronLeft/>
    </button>
  )
}

export default BackButton