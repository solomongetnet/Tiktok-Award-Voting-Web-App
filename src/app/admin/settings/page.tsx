"use client";
import React from "react";
import { VotingEndDateSetting } from "./_voting-end-date-setting";
import { AwardEventForm } from "./_award-setting";

const Page = () => {
  return (
    <div>
      <header className="mb-6">
        <h2 className="font-semibold text-2xl sm:text-3xl">Settings</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {" "}
        <VotingEndDateSetting />
        <AwardEventForm/>
      </div>
    </div>
  );
};

export default Page;
