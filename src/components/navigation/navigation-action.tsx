import { Plus } from "lucide-react";
import React from "react";
import ActionTooltip from "../action-tooltip";

export default function NavigationAction() {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a Server">
        <button className="group flex items-center">
          <div className="w-[45px] h-[45px] group-hover:dark:bg-green-800 group-hover:rounded-xl transition-all dark:bg-neutral-600 rounded-[100%] flex items-center justify-center">
            <Plus className="text-green-500 group-hover:text-white" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
