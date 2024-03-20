import React from 'react'

const SearchLayout = ({ children }: {children:React.ReactNode}) => {
    return children
}

export async function generateMetadata(props:any) {
    // console.log(props)
    return {
        title: `Find Your Favorite Novel`,
        description:'Search Your Favorite Novel Today'
    }
}

export default SearchLayout