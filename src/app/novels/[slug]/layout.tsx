import React from 'react'

const NovelSlugLayout = ({ children }: { children :React.ReactNode}) => {
  return (
      <>{children}</>
  )
}

export async function generateMetadata({ params }:{params:{slug:string}}) {
    return {
        title: `${params.slug.split("-").map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join(" ")}`,
    }
}

export default NovelSlugLayout