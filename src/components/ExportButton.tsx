"use client";
import React from 'react'
import { TiExport } from 'react-icons/ti'
import { toast } from 'react-toastify'

const ExportButton = () => {

    const onClickDataExport = () => {
        try {
            toast.success("Data export")
        } catch (error: any) {
            toast.error(error.message)
        }
    }
  return (
      <div className="w-full py-2 px-10 md:px-30 flex justify-end ">
          <button onClick={onClickDataExport} className='inline-flex outline-none border-none items-center gap-x-3 bg-[--selection-color] transition-all duration-300 hover:bg-green-400 text-white px-3 py-2 rounded-md'> <TiExport className='text-xl md:text-2xl' /> Export</button>
      </div>
  )
}

export default ExportButton