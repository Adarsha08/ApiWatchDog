"use client"
import {useState,useEffect} from 'react'
//creating the custom hooks
type CheckResult = {
  statusCode: number
  responseMs: number
  checkedAt: string
}

type Monitors={
    id:string,
    url:string,
    name?:string,
    intervalMin:number,
    checkResults:CheckResult[]
}
export const useMonitors=()=>
{
    const apiUrl=process.env.NEXT_PUBLIC_API_URL
    
    const[monitors,setMonitors]=useState<Monitors[]>([])

    const fetchMonitors=async()=>
    {
        const res=await fetch(`${apiUrl}/api/monitors`)
        const data=await res.json()
        setMonitors(data)

    }
    useEffect(()=>
    {
        fetchMonitors()
    },[])
    return{ monitors,refetch:fetchMonitors}
}
