"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { UserSubscription } from "@/utils/schema";
import { db } from "@/utils/db";
import moment from "moment";
import { UserSubscriptionContext } from "../(context)/UserSubContext";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser(); // ✅ Correctly destructured

  const { usersubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const CreateSubscription = () => {
    setLoading(true);
    axios.post(`/api/create-subscription`, {}).then(
      (resp) => {
        console.log("Subscription response:", resp.data);
        OnPayment(resp.data.id);
      },
      (error) => {
        setLoading(false);
        console.error("Subscription creation failed:", error);
      }
    );
  };

  const OnPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "AI Content App",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log("Payment success:", resp);
        setLoading(false);
        if (resp?.razorpay_payment_id) {
          await SaveSubscription(resp.razorpay_payment_id);
        }
      },
    };
    //@ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    if (!isLoaded || !isSignedIn || !user) {
      console.error("User not loaded or not signed in.");
      return;
    }

    const result = await db.insert(UserSubscription).values({
      email: user.primaryEmailAddress?.emailAddress || "no-email",
      userName: user.fullName || "Unknown User",
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });

    console.log("Subscription saved:", result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-10">Upgrade With Monthly Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {/* Free Plan */}
        <div className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-3xl font-bold">
            0$<span className="text-sm font-medium"> /month</span>
          </p>
          <ul className="text-sm text-gray-700 my-6 space-y-2 text-center">
            <li>✓ 10,000 Words/Month</li>
            <li>✓ 50+ Content Templates</li>
            <li>✓ Unlimited Download & Copy</li>
            <li>✓ 1 Month of History</li>
          </ul>
        </div>

        {/* Monthly Plan */}
        <div className="bg-white p-6 rounded-xl shadow-md w-80 flex flex-col items-center border-2 border-blue-500">
          <h2 className="text-2xl font-semibold mb-2">Monthly</h2>
          <p className="text-3xl font-bold text-blue-600">
            9.99$
            <span className="text-sm font-medium text-black"> /month</span>
          </p>
          <ul className="text-sm text-gray-700 my-6 space-y-2 text-center">
            <li>✓ 1,00,000 Words/Month</li>
            <li>✓ 50+ Template Access</li>
            <li>✓ Unlimited Download & Copy</li>
            <li>✓ 1 Year of History</li>
          </ul>
          <button
            disabled={loading}
            onClick={CreateSubscription}
            className="cursor-pointer mt-auto flex gap-2 items-center bg-white border border-blue-500 text-blue-600 py-2 px-6 rounded-full hover:bg-blue-100 transition"
          >
            {loading && <Loader2Icon className="animate-spin" />}
            {usersubscription ? `Active Plan` : `Get Started`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
