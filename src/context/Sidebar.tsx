"use client";
import React, { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

type SidebarContextType = {
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>({});

export const useSidebarContext =()=>{
    return useContext(SidebarContext);
}

type SideBarContextProviderProps = {
    children: ReactNode;
};

export const SideBarContextProvider: React.FC<SideBarContextProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};
 