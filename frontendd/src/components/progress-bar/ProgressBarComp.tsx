"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ProgressBarComp() {
  return (
    <ProgressBar
      height="2px"
      color="#07074B"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
