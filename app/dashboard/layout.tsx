"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { TotalUsageContext } from "./(context)/TotalUsageContext";
import { UserSubscriptionContext } from "./(context)/UserSubContext";
import { UpdateCreditUsageContext } from "./(context)/UpdateCreditUsageContext";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<Number>(0);
  const [usersubscription, setUserSubscription] = useState<boolean>(false);
  const [updatecreditusage, setUpdateCreditUsage] = useState<any>();

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider
        value={{ usersubscription, setUserSubscription }}
      >
        <UpdateCreditUsageContext.Provider
          value={{ updatecreditusage, setUpdateCreditUsage }}
        >
          <div className="bg-slate-100 h-screen">
            <div className="w-64 hidden md:block fixed">
              <SideNav />
            </div>
            <div className="md:ml-64">
              {/* <Header /> */}
              {children}
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default layout;

// "use client";

// import React, { useState } from "react";
// import SideNav from "./_components/SideNav";
// import Header from "./_components/Header";
// import { TotalUsageContext } from "./(context)/TotalUsageContext";
// import { UserSubscriptionContext } from "./(context)/UserSubContext";
// import { UpdateCreditUsageContext } from "./(context)/UpdateCreditUsageContext";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [totalUsage, setTotalUsage] = useState<number>(0);
//   const [usersubscription, setUserSubscription] = useState<boolean>(false);
//   const [updatecreditusage, setUpdateCreditUsage] = useState<any>(null);

//   return (
//     <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
//       <UserSubscriptionContext.Provider
//         value={{ usersubscription, setUserSubscription }}
//       >
//         <UpdateCreditUsageContext.Provider
//           value={{ updatecreditusage, setUpdateCreditUsage }}
//         >
//           <div className="bg-slate-100 h-screen">
//             <div className="w-64 hidden md:block fixed">
//               <SideNav />
//             </div>
//             <div className="md:ml-64">
//               <Header />
//               {children}
//             </div>
//           </div>
//         </UpdateCreditUsageContext.Provider>
//       </UserSubscriptionContext.Provider>
//     </TotalUsageContext.Provider>
//   );
// }
