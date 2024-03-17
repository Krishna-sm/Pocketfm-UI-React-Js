import React from 'react'

const Template = ({children}:{children:React.ReactNode}) => {


  return (
      <>
                <div className="w-full min-h-[90vh] flex justify-center items-center">
              {children}
                </div>
      </>
  )
}

export default Template