"use client"

import PortfolioThreads from "../portfolio-threads"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return <PortfolioThreads onCentralThreadClick={() => router.push('/info')} />
}
