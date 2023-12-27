"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function ToolTipWithMobileHover() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen}>
        <TooltipTrigger asChild>
          <p
            onMouseEnter={() => setTooltipOpen(true)}
            onMouseLeave={() => setTooltipOpen(false)}
            className="mx-2"
          >
            💜
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>she said &quot;yeah&quot;</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
