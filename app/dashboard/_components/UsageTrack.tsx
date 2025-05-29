"use client";

import { Button } from "@/components/ui/button";
import { AIOutput, UserSubscription } from "@/utils/schema"; // ✅ Correct DB tables
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { HistoryItem } from "../history/HistoryTable";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubContext";

function UsageTrack() {
  const { user } = useUser();
  const [totalWords, setTotalWords] = useState(0);
  const [limit, setLimit] = useState(10000); // default for free users

  const { usersubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  const percentageUsed = Math.min((totalWords / limit) * 100, 100);

  // Check subscription status
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchSubscription();
    }
  }, [user]);

  // Refetch words after subscription is confirmed
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchData();
    }
  }, [user, usersubscription]);

  const fetchSubscription = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const result = await db
      .select()
      .from(UserSubscription) // ✅ Use the actual table
      .where(eq(UserSubscription.email, email));

    if (result && result.length > 0 && result[0].active) {
      setUserSubscription(true);
      setLimit(1000000); // ✅ Paid user limit
    } else {
      setUserSubscription(false);
      setLimit(10000); // ✅ Free user limit
    }
  };

  const fetchData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const result: HistoryItem[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, email));

    console.log("Fetched history items:", result.length);
    calculateTotalUsage(result);
  };

  const calculateTotalUsage = (result: HistoryItem[]) => {
    let total = 0;
    result.forEach((item) => {
      const wordCount =
        item.aiResponse?.trim().split(/\s+/).filter(Boolean).length || 0;
      total += wordCount;
    });
    setTotalWords(total);
    console.log("Total words used:", total);
  };

  return (
    <div className="m-5">
      <div className="bg-blue-600 text-white rounded-lg p-3">
        <h2 className="font-medium">Credits</h2>

        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3 relative overflow-hidden">
          <div
            className="h-2 bg-white rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${percentageUsed}%`,
              minWidth: percentageUsed > 0 ? "4px" : "0px",
            }}
          ></div>
        </div>

        <h2 className="text-sm my-2">
          {totalWords}/{limit} words used
        </h2>
      </div>

      {!usersubscription && (
        <Button variant="secondary" className="w-full my-3 cursor-pointer">
          Upgrade
        </Button>
      )}
    </div>
  );
}

export default UsageTrack;

// "use client";

// import { Button } from "@/components/ui/button";
// import { AIOutput, UserSubscription } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import React, { useContext, useEffect, useState } from "react";
// import { HistoryItem } from "../history/HistoryTable";
// import { db } from "@/utils/db";
// import { eq } from "drizzle-orm";
// import { TotalUsageContext } from "../(context)/TotalUsageContext";
// import { UserSubscriptionContext } from "../(context)/UserSubContext";
// import { useRouter } from "next/navigation";
// import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";

// function UsageTrack() {
//   const router = useRouter();
//   const { user } = useUser();
//   const [totalWords, setTotalWords] = useState(0);
//   const [limit, setLimit] = useState(10000);

//   const { usersubscription, setUserSubscription } = useContext(
//     UserSubscriptionContext
//   );
//   const { updatecreditusage } = useContext(UpdateCreditUsageContext);
//   const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

//   const percentageUsed = Math.min((totalWords / limit) * 100, 100);

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       fetchSubscription();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.primaryEmailAddress?.emailAddress) {
//       fetchData();
//     }
//   }, [user, usersubscription]);

//   useEffect(() => {
//     user && fetchData();
//   }, [updatecreditusage, user]);

//   const fetchSubscription = async () => {
//     const email = user?.primaryEmailAddress?.emailAddress;
//     if (!email) return;

//     const result = await db
//       .select()
//       .from(UserSubscription)
//       .where(eq(UserSubscription.email, email));

//     if (result && result.length > 0 && result[0].active) {
//       setUserSubscription(true);
//       setLimit(1000000);
//     } else {
//       setUserSubscription(false);
//       setLimit(10000);
//     }
//   };

//   const fetchData = async () => {
//     const email = user?.primaryEmailAddress?.emailAddress;
//     if (!email) return;

//     const result: HistoryItem[] = await db
//       .select()
//       .from(AIOutput)
//       .where(eq(AIOutput.createdBy, email));

//     console.log("Fetched history items:", result.length);
//     calculateTotalUsage(result);
//   };

//   const calculateTotalUsage = (result: HistoryItem[]) => {
//     let total = 0;
//     result.forEach((item) => {
//       const wordCount =
//         item.aiResponse?.trim().split(/\s+/).filter(Boolean).length || 0;
//       total += wordCount;
//     });
//     setTotalWords(total);
//     console.log("Total words used:", total);
//   };

//   return (
//     <div className="m-5">
//       <div className="bg-blue-600 text-white rounded-lg p-3">
//         <h2 className="font-medium">Credits</h2>

//         <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3 relative overflow-hidden">
//           <div
//             className="h-2 bg-white rounded-full transition-all duration-300 ease-in-out"
//             style={{
//               width: `${percentageUsed}%`,
//               minWidth: percentageUsed > 0 ? "4px" : "0px",
//             }}
//           ></div>
//         </div>

//         <h2 className="text-sm my-2">
//           {totalWords}/{limit} words used
//         </h2>
//       </div>

//       <h2 className="mt-4 text-center text-gray-700">
//         Subscription status: {usersubscription ? "Active" : "Inactive"}
//       </h2>

//       <Button
//         variant="secondary"
//         className="w-full my-3 cursor-pointer"
//         onClick={() => router.push("/dashboard/billing")}
//       >
//         Upgrade
//       </Button>
//     </div>
//   );
// }

// export default UsageTrack;
