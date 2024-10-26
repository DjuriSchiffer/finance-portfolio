import React, { ReactNode } from 'react';
import { Sidebar } from "flowbite-react";
import { IconType } from "react-icons";
import { useLinkClickHandler, useLocation } from "react-router-dom";
import { HiArrowSmLeft, HiArrowSmRight, HiChartPie, HiOutlineCog, HiUserCircle, HiOutlineChartBar } from "react-icons/hi";
import logo from '../public/images/logo.svg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../hooks/useAuth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


export interface AppSideBarLogoProps {
    to: string;
    img: string;
    imgAlt: string;
    text: string;
}
function AppSideBarLogo({ to, img, imgAlt, text }: AppSideBarLogoProps) {
    const clickHandler = useLinkClickHandler(to);

    return <span onClick={clickHandler}>
        <Sidebar.Logo className='mt-3 mb-7' href={to} img={img} imgAlt={imgAlt}>
            {text}
        </Sidebar.Logo>
    </span>;
}

export interface AppSideBarItemProps {
    to: string;
    text: string;
    icon: IconType;
}
function AppSideBarItem({ to, text, icon }: AppSideBarItemProps) {
    const location = useLocation();
    const clickHandler = useLinkClickHandler(to)

    return <span onClick={clickHandler}>
        <Sidebar.Item className="mb-1" href={to} icon={icon} active={location.pathname === to}>
            {text}
        </Sidebar.Item>
    </span>;
}


interface SideBarProps {
    children?: ReactNode;
}

const SideBar: React.FC<SideBarProps> = () => {
    const { user, isAnonymous } = useAuth();
    const location = useLocation();
    const isDashboard = location.pathname === '/'

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleSignInGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // The Auth Context will automatically update the user state
            // You can handle additional user setup here if needed
            console.log('User signed in:', result.user);
        } catch (error: any) {
            console.error('Error during sign-in:', error.message);
        }
    };

    return (
        <Sidebar className='w-full sticky top-4 h-[calc(100vh_-_32px)]' aria-label="Sidebar">
            <Sidebar.Items className='flex flex-col h-full'>
                <Sidebar.ItemGroup>
                    <AppSideBarLogo to='/' text="Got Crypto" img={logo} imgAlt='Got Crypto' />
                    {isDashboard ? <AppSideBarItem to='/' text='Dashboard' icon={HiChartPie} /> : <AppSideBarItem to='/' text='Return to Dashboard' icon={HiArrowSmLeft} />}
                    <AppSideBarItem to='/graphs' text='Graphs' icon={HiOutlineChartBar} />
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className="mt-auto">
                    <Sidebar.Item icon={HiOutlineCog} href="javascript:void(0)">
                        User & Settings
                    </Sidebar.Item>
                    {user && !isAnonymous && (
                        <Sidebar.Item onClick={handleSignOut} icon={HiArrowSmRight} href="javascript:void(0)">
                            Sign Out
                        </Sidebar.Item>
                    )}
                    {user && isAnonymous && (
                        <Sidebar.Item onClick={handleSignInGoogle} icon={HiArrowSmRight} href="javascript:void(0)">
                            Sign In
                        </Sidebar.Item>
                    )}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar;