import React from 'react'

const NovelVideoSlug = ({ children }: { children: React.ReactNode }) => {
    return (
        <>{children}</>
    )
}

export async function generateMetadata({ params }: { params: { slug: string, videoSlug:string } }) {
    return {
        title: `${params.videoSlug.split("-").map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join(" ")}`,
        description: `${params.slug.split("-").map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()).join(" ")}`
    }
}

export default NovelVideoSlug