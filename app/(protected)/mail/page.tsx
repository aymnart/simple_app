"use client";
import dynamic from "next/dynamic";
import React from "react";
// import Mail from "./_components/mail";
const Mail = dynamic(
  () => {
    return import("./_components/mail");
  },
  { ssr: false }
);
const MailDashboard = () => {
  return (
    <Mail
      defaultLayout={[20, 32, 48]}
      navCollapsedSize={4}
      defaultCollapse={false}
    />
  );
};

export default MailDashboard;
