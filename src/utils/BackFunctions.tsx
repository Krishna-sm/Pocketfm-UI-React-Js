"use client"

import { useRouter } from "next/navigation"

export const GoBack = ({ ifBack=false, href, ...props }: { ifBack?: boolean, href: string, props:any })=>{
    const router = useRouter()
    return <button onClick={() => !ifBack ? router.push(href) : router.replace(href) }  {...props} />
}