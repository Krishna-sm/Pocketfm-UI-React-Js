import BreadCumsComponent from '@/components/BreadCums'
import ExportButton from '@/components/ExportButton';
import React from 'react'
import { LiaSwatchbookSolid } from "react-icons/lia";
import { IconType } from 'react-icons/lib';

const DashboardCard =({Icon,lable,no}:{Icon:IconType,lable:string,no:number})=>{
  return <>
  
    <div className="flex items-center justify-between p-5 select-none bg-white hover:bg-gray-100 rounded shadow-sm   duration-300 transition-all hover:shadow-md">
      <div>
        <div className="text-sm text-gray-600  capitalize">{lable}</div>
        <div className="flex items-center pt-1">
          <div className="text-xl font-medium text-indigo-400 ">{no}</div>
        </div>
      </div>
      <div className="text-gray-600">
        <Icon className='text-4xl' />
      </div>
    </div>
  </>
}


const AdminDashboard = () => {



  return (
    <>

      <BreadCumsComponent pageName='Dashboard' link='/' />

      <ExportButton/>

    <div className="flex items-center  ">
  <div className="container max-w-6xl px-5 mx-auto my-2 ">
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {
              Array(5).fill(null).map((_,i)=>{
                return <DashboardCard lable='Total Novel' Icon={LiaSwatchbookSolid} no={10}  key={i} />
              })
            }
     
     
      
    </div>
  </div>
</div>

    </>
  )
}

export default AdminDashboard