import { LoadingComponent } from '@/components/Loader';
// import AdminLayout from '@/layout/AdminLayout'

import { Metadata } from 'next';
import React,{Suspense, lazy} from 'react'
const AdminLayout = lazy(() => import('@/layout/AdminLayout'))

export const metadata: Metadata = {
  title: "Novel Admin",
  description: "Admin Page ",
};



const AdminRootLayout = ({ children }:{children:React.ReactNode}) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  )
}

export default AdminRootLayout