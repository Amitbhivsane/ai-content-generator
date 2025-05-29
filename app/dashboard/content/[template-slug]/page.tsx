// "use client";

// import React, { useContext, useState } from "react";
// import Templates from "@/app/(data)/Templates";
// import Formsection from "../_components/Formsection";
// import Outputsection from "../_components/Outputsection";
// import { TEMPLATE } from "../../_components/TemplateSection";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { ChatSession } from "@/utils/AiModal";
// import { db } from "@/utils/db";
// import { AIOutput } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";
// import { TotalUsageContext } from "../../(context)/TotalUsageContext";
// import { useRouter } from "next/navigation";
// import { UpdateCreditUsageContext } from "../../(context)/UpdateCreditUsageContext";

// interface PROPS {
//   params: {
//     "template-slug": string;
//   };
// }

// function CreateNewContent(props: PROPS) {
//   const SelectTemplate: TEMPLATE | undefined = Templates?.find(
//     (item) => item.slug === props.params["template-slug"]
//   );

//   const [loading, setLoading] = useState(false);
//   const [aiOutput, setAiOutput] = useState<string>("");
//   const { user } = useUser();
//   const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
//   const router = useRouter();
//   const { updatecreditusage, setUpdateCreditUsage } = useContext(
//     UpdateCreditUsageContext
//   );
//   const GenerateAIContent = async (formData: any) => {
//     if (!SelectTemplate || !user?.primaryEmailAddress?.emailAddress) return;

//     if (totalUsage >= 10000) {
//       console.log("Reached word limit, redirecting to billing");
//       router.push("/dashboard/billing");
//       return;
//     }

//     setLoading(true);
//     const selectedPrompt = SelectTemplate.aiPrompt;
//     const finalPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

//     try {
//       const result = await ChatSession.sendMessage(finalPrompt);
//       const responseText = await result?.response.text();

//       if (responseText) {
//         setAiOutput(responseText);
//         await SaveInDb(formData, SelectTemplate.slug, responseText);
//       }
//     } catch (error) {
//       console.error("Error generating AI content:", error);
//     } finally {
//       setLoading(false);
//       setUpdateCreditUsage(Date.now());
//     }
//   };

//   const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
//     try {
//       await db.insert(AIOutput).values({
//         fromData: formData,
//         templateSlug: slug,
//         aiResponse: aiResp,
//         createdBy: user?.primaryEmailAddress?.emailAddress,
//         createdAt: moment().format("YYYY-MM-DD"),
//       });
//     } catch (error) {
//       console.error("Error saving to database:", error);
//     }
//   };

//   return (
//     <div className="p-10">
//       <Link href="/dashboard">
//         <Button>
//           <ArrowLeft className="mr-2" />
//           Back
//         </Button>
//       </Link>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
//         {/* Form section */}
//         <Formsection
//           SelectTemplate={SelectTemplate}
//           userFormInput={(v: any) => GenerateAIContent(v)}
//           loading={loading}
//         />

//         {/* Output section */}
//         <div className="col-span-2">
//           <Outputsection aiOutput={aiOutput} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateNewContent;
////

"use client";

import React, { useContext, useState, use } from "react";
import Templates from "@/app/(data)/Templates";
import Formsection from "../_components/Formsection";
import Outputsection from "../_components/Outputsection";
import { TEMPLATE } from "../../_components/TemplateSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ChatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "../../(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "../../(context)/UpdateCreditUsageContext";

interface PROPS {
  params: Promise<{
    "template-slug": string;
  }>;
}

function CreateNewContent(props: PROPS) {
  const params = use(props.params); // 👈 unwraps the Promise
  const templateSlug = params["template-slug"];

  const SelectTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === templateSlug
  );

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updatecreditusage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  const router = useRouter();

  const GenerateAIContent = async (formData: any) => {
    if (!SelectTemplate || !user?.primaryEmailAddress?.emailAddress) return;

    if (totalUsage >= 10000) {
      console.log("Reached word limit, redirecting to billing");
      router.push("/dashboard/billing");
      return;
    }

    setLoading(true);
    const selectedPrompt = SelectTemplate.aiPrompt;
    const finalPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    try {
      const result = await ChatSession.sendMessage(finalPrompt);
      const responseText = await result?.response.text();

      if (responseText) {
        setAiOutput(responseText);
        await SaveInDb(formData, SelectTemplate.slug, responseText);
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
      setUpdateCreditUsage(Date.now());
    }
  };

  const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
    try {
      await db.insert(AIOutput).values({
        fromData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
        {/* Form section */}
        <Formsection
          SelectTemplate={SelectTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />

        {/* Output section */}
        <div className="col-span-2">
          <Outputsection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
