import React from "react";
import { TEMPLATE } from "./TemplateSection";
import Image from "next/image";
import Link from "next/link";

interface Props {
  template: TEMPLATE;
}

function TemplateCard({ template }: Props) {
  return (
    <Link href={"/dashboard/content/" + template?.slug}>
      <div className="border p-5 rounded shadow-md cursor-pointer hover:scale-105 transition-all">
        <Image src={template.icon} alt="icon" width={50} height={50} />
        <h2 className="text-lg font-semibold mt-2">{template.name}</h2>
        <p>{template.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
