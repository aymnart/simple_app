"use client";

import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";
import { useId } from "react";

export default function OTP({ ...field }) {
  const id = useId();
  return (
    <div className="space-y-4 flex flex-col items-center justify-center">
      <OTPInput
        {...field}
        id={id}
        containerClassName="flex flex-col items-center gap-3 has-[:disabled]:opacity-50"
        maxLength={6}
        render={({ slots }) => (
          <div className="flex">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative -ms-px flex size-9 items-center justify-center border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow first:ms-0 first:rounded-s-lg last:rounded-e-lg",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
