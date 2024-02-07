"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  endpoint: "serverImage" | "messageFile";
}

export default function FileUpload({
  endpoint,
  onChange,
  value,
}: FileUploadProps) {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="relative flex justify-center h-24 w-24 mx-auto">
        <Image fill className="object-cover rounded-full" src={value} alt="" />
        <button
          className="bg-rose-900 text-white p-1 rounded-full absolute right-0"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
