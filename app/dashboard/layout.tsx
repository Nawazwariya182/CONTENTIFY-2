/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client";
import React, { useState } from "react";
import Header from "./_component/Header";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UpdateContext } from "../(context)/UpdateContext";
import Footer from "./_component/Footer";
import styles from "./CustomComponent.module.css"; 

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [UpdateCredit, setUpdateCredit] = useState<any>();

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateContext.Provider value={{ UpdateCredit, setUpdateCredit }}>
        <div
          className={`bg-white h-screen overflow-y-auto ${styles.customCursor}`}
          style={{ cursor: "url(/curs.png), auto" }}
        >
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
