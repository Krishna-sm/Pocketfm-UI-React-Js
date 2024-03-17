import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import MainLayout from "@/layout/MainLayout";
import { Suspense, lazy } from "react"; 
import { LoadingComponent } from "@/components/Loader";
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner'
import { SideBarContextProvider } from "@/context/Sidebar";
import Script from "next/script";
// import LocationLayout from "@/layout/LocationLayout";
// import PrelineScript from "@/utils/PrelineScript";
const PrelineScript = lazy(() => import('@/utils/PrelineScript'))
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novel App",
  description: "Listen Novel Free ",
};


      

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <SideBarContextProvider>
        <html lang="en" data-color-mode="light">
    
  <meta name="title" content="devilstfm" />
  <meta name="description" content="listen new love and romance stories" />
  <meta name="keywords" content="romantic sleep stories,bedtime stories for grown ups,sleep stories,romantic love sleep stories,sleep stories for grown ups,bedtime stories,romance,adult sleep stories,stories to fall asleep to,romance bedtime stories,adult bedtime stories,bedtime stories for adults,romantic stories for sleep,a summer romance sleep story,summer romance,a summer romance,romance audiobook,calm sleep stories,billionaire romance,sleep stories compilation,romantic stories" />
  <meta name="robots" content="index, follow" />
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="1 days" />
  <meta name="author" content="the Devil" />
      <body className={inter.className}>
          <Toaster position="top-right" closeButton theme="light" />
          <ToastContainer theme='dark' toastStyle={{
            background:''
            
          }} 
            // closeButton={false}
          draggable={false} pauseOnHover={false} pauseOnFocusLoss={false} />
          <Suspense fallback={<LoadingComponent/>}>
              {/* <LocationLayout> */}
          <PrelineScript />
      <MainLayout>
              <NextTopLoader color="#ff0095"  />
              <section className="bg-[--main-color]">{children} </section>
    </MainLayout>
              {/* </LocationLayout> */}
        </Suspense>
        </body>
          <Script src="https://apis.google.com/js/platform.js"></Script>
    </html>
      </SideBarContextProvider>
    </ReduxProvider>
  );
}
