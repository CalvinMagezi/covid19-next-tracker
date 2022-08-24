import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Header from "../navigation/Header";

function TopLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <Head>
        <title>Covid-19 Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Box>{children}</Box>
    </div>
  );
}

export default TopLayout;
