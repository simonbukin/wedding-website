"use client";

import Confetti from "@/app/rsvp/Confetti";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function ToolTipWithMobileHover() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  return (
    <div>
      {confettiKey > 0 && <Confetti key={confettiKey} />}
      <TooltipProvider>
        <Tooltip open={tooltipOpen}>
          <TooltipTrigger asChild>
            <p
              onClick={() => setConfettiKey((prevKey) => prevKey + 1)}
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
    </div>
  );
}
