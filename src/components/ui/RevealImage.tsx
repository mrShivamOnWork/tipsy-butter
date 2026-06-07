"use client";

import { type ReactNode } from "react";
import { ImageGrain } from "./ImageGrain";

type Props = {
  children: ReactNode;
  className?: string;
};

export function RevealImage({ children, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <ImageGrain />
    </div>
  );
}
