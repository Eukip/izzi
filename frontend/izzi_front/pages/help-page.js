import React, { useState } from "react";
import { MainLayout } from "../components/MainLayout";
import HelpPageItem from "../components/helpPageItem/helpPage";

const HelpPage = () => {
  return (
    <MainLayout title={"Помощь"}>
      <HelpPageItem/>
    </MainLayout>
  );
};

export default HelpPage;
