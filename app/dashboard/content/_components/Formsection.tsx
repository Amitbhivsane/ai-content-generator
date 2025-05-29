"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  SelectTemplate?: TEMPLATE;
  userFormInput: (data: any) => void;
  loading: boolean;
}

function Formsection({ SelectTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md rounded-lg bg-white">
      {SelectTemplate?.icon && (
        <Image src={SelectTemplate.icon} alt="icon" width={70} height={70} />
      )}
      <h2 className="font-bold text-2xl mb-2 text-blue-500">
        {SelectTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{SelectTemplate?.desc}</p>
      <form className="mt-6" onSubmit={onSubmit}>
        {SelectTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-full py-6" disabled={loading}>
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
}

export default Formsection;
