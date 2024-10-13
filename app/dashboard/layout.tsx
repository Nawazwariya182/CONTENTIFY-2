'use client'
import React, { useState } from 'react';
import SideNav from './_component/SideNav';
import Header from './_component/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UpdateContext } from '../(context)/UpdateContext';
import Footer from './_component/Footer';
import styles from './CustomComponent.module.css';  // Corrected path

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [totalUsage, setTotalUsage] = useState<Number>();
    const [UpdateCredit, setUpdateCredit] = useState<any>();

    return (
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
            <UpdateContext.Provider value={{ UpdateCredit, setUpdateCredit }}>
                <div className={`bg-white h-screen overflow-y-auto ${styles.customCursor}`}style={{ cursor: 'url(/curs.png), auto' }}>
                    {/* <div className='md:w-60 hidden md:block fixed'>
                        <SideNav/>
                    </div> */}
                    <div>
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </div>
            </UpdateContext.Provider>
        </TotalUsageContext.Provider>
    );
}

export default Layout;
