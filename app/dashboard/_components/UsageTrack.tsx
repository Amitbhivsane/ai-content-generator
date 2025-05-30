"use client";

import { Button } from "@/components/ui/button";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { HistoryItem } from "../history/HistoryTable";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubContext";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";

function UsageTrack() {
  const router = useRouter();
  const { user } = useUser();
  const [totalWords, setTotalWords] = useState(0);
  const [limit, setLimit] = useState(10000);

  const { usersubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updatecreditusage } = useContext(UpdateCreditUsageContext);
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  const percentageUsed = Math.min((totalWords / limit) * 100, 100);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchSubscription();
    }
  }, [user]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchData();
    }
  }, [user, usersubscription]);

  useEffect(() => {
    user && fetchData();
  }, [updatecreditusage, user]);

  const fetchSubscription = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (result && result.length > 0 && result[0].active) {
      setUserSubscription(true);
      setLimit(1000000);
    } else {
      setUserSubscription(false);
      setLimit(10000);
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
    <div className="m-3 sm:m-5">
      <div className="bg-blue-600 text-white rounded-lg p-4 sm:p-6">
        <h2 className="font-medium text-base sm:text-lg">Credits</h2>

        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3 relative overflow-hidden">
          <div
            className="h-2 bg-white rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${percentageUsed}%`,
              minWidth: percentageUsed > 0 ? "4px" : "0px",
            }}
          ></div>
        </div>

        <h2 className="text-xs sm:text-sm my-2">
          {totalWords}/{limit} words used
        </h2>
      </div>

      <h2 className="mt-4 text-center text-gray-700 text-sm sm:text-base">
        Subscription status: {usersubscription ? "Active" : "Inactive"}
      </h2>

      <Button
        variant="secondary"
        className="w-full my-3 cursor-pointer text-sm sm:text-base"
        onClick={() => router.push("/dashboard/billing")}
      >
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
