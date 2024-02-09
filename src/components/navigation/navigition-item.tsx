"use client";

import Image from "next/image";
import React from "react";
import ActionTooltip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export default function NavigationItem({
  id,
  imageUrl,
  name,
}: NavigationItemProps) {
  const router = useRouter();
  const param = useParams();
  const isActive = param.serverId === id;
  const onClick = () => {
    router.push(`${id}`);
  };
  return (
    <ActionTooltip label={name} align="center" side="right">
      <div className="relative group">
        <div
          className={`${
            isActive ? "h-[40px]" : "h-[8px] group-hover:h-[20px]"
          } absolute z-10 left-[-37%] transition-all duration-300 top-[50%] translate-y-[-50%]  w-[7px] bg-white rounded-full`}
        ></div>
        <button onClick={onClick} className="w-[45px] h-[45px] relative">
          <Image
            fill
            className="rounded-[16px] object-cover"
            alt=""
            src={imageUrl}
          />
        </button>
      </div>
    </ActionTooltip>
  );
}
