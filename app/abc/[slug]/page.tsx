"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const pathname = useParams();
  return <div>{pathname.slug}</div>;
}
