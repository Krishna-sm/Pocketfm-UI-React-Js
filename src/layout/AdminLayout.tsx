"use client";
import { UserSelector } from '@/redux/slices/User.slice'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from 'next/link';
import { IoMenuOutline } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import { IconType } from 'react-icons/lib';
import { FaYoutube } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { useSidebarContext } from '@/context/Sidebar';
import { RxDashboard } from "react-icons/rx";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, setIsOpen }: any = useSidebarContext()
    const userData = useSelector(UserSelector);
    const [collapsed, setCollapased] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (userData && userData.user_type === 'admin_user') {
            setLoading(false)
        } else {
            router.replace("/")
        }
    }, [userData])


    if (!userData || loading) {
        return <div>loading.....</div>
    }


    type links = {
        link: string,
        icon: IconType,
        label: string
    }

    const SubMenuData = ({ links, prefix, title }: { prefix: string, links: links[], title:string }) => {
        return <>
            <SubMenu label={title}
                active={pathname.startsWith( prefix) }
                style={{
                    borderRadius: '50px',
                    color: pathname.startsWith( prefix) ? '#fff' : 'black',
                    backgroundColor: pathname.startsWith( prefix) ? '#3F51B5' : 'white',
                }}

            >
                {
                    links && links.map((cur, i) => { 
                        return <MenuItem 
                            className='cursor-pointer'
                            style={{
                                            cursor:'pointer',            
                                marginTop: '5px',
                                color: pathname === prefix + cur.link ? '#fff' : '#000',
                                background: pathname === prefix + cur.link?'#2a42c7':'#fff'
                            }}
                            active={pathname ===  prefix + cur.link}
                            key={i} component={<Link href={prefix + cur.link} />} icon={<cur.icon className=' text-2xl md:text-3xl bg-transparent ' />} > {cur.label} </MenuItem>

                    })
                }
            </SubMenu>
        </>
    }

    const MenuData = ({ title, link = '/admin', Icon }: { title: String, link: String, Icon: IconType }) => {
        return <>
            <MenuItem
                style={{
                    cursor: 'pointer',
                    borderRadius: '50px',
                    backgroundColor: pathname === "/admin" + link ? '#3F51B5' : 'white',
                    color: pathname === "/admin" + link ? 'white' : 'black',
                }}
                active={pathname === "/admin" + link}
                className={`${pathname === link ? '' : ''}  cursor-pointer`} component={<Link href={"/admin" + link} />} icon={<Icon className=' text-2xl md:text-3xl bg-transparent' />} > {title} </MenuItem>

        </>
    }

    return (
        <>
            <div className="flex items-start">
                <Sidebar collapsed={collapsed} onBackdropClick={() => setIsOpen(!isOpen)} toggled={isOpen} breakPoint="lg" >
                    <Menu

                        menuItemStyles={{
                            button: {
                                [`&.active`]: {
                                    backgroundColor: '#13395e',
                                    color: '#b6c8d9',
                                }, 
                                marginTop: '5px',
                                color: 'white',
                                ':hover': {
                                    background: '#2a42c7'
                                }
                            }
                        }} >
                        <MenuItem style={{ backgroundColor: 'white', color: 'black' }} onClick={() => setCollapased(!collapsed)} icon={<IoMenuOutline className=' text-2xl md:text-3xl' />}></MenuItem>
                        <MenuData link={''} Icon={RxDashboard} title={'Dashboard'} />
                        {/* <MenuData link={'/videos'} Icon={FaYoutube} title={'Videos'} /> */}
                        <SubMenuData title='Novels' prefix='/admin/novels' links={[{
                            icon: BiBook,
                            label: 'Add Novel',
                            link: '/add'
                        }, {
                            icon: CiBoxList,
                            label: 'All Novel',
                            link: ''
                        }]} />

                        
                        <SubMenuData title='Videos' prefix='/admin/videos' links={[{
                            icon: FaYoutube,
                            label: 'Add Video',
                            link: '/add'
                        }, {
                            icon: CiBoxList,
                                label: 'All Video',
                                link: ''
                            }]} />
                     

                    </Menu>
                </Sidebar>
                <div className="px-3 py-2 w-full">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout