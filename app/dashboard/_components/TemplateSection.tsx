import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

interface TemplateSectionProps {
  userSearchInput: string;
}

function TemplateSection({ userSearchInput }: TemplateSectionProps) {
  const [templateList, setTemplateList] = useState(Templates);
  console.log("=->>>", templateList);
  useEffect(() => {
    if (userSearchInput) {
      const filterData = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Templates);
    }
  }, [userSearchInput]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} template={item} />
      ))}
    </div>
  );
}

export default TemplateSection;
