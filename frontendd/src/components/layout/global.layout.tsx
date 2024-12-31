"use client";

import { useProfile } from "@/hooks/auth.hook";
import { useCommonSettings } from "@/hooks/common.hook";
import { useMyCartDetails } from "@/hooks/user/enrollment.hook";
import { IRootState } from "@/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CookieBanner from "../cookies";
import Head from "next/head";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  useProfile();
  const { data, isLoading } = useCommonSettings();
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const [isClient, setIsClient] = useState(false);

  useMyCartDetails();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        />
        <title>{settings?.meta_title || "Sikkhon"}</title>
        <meta name="description" content={settings?.meta_description || "Sikkhon - Learning Platform"} />
        <meta name="keywords" content={settings?.meta_keywords || "learning, education"} />
        <meta name="author" content={settings?.site_author || "Sikkhon"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={settings?.site_fav_icon || "/favicon.ico"} />
      </Head>
      <CookieBanner />
      <GoogleOAuthProvider clientId={settings?.google_auth_client_id || ""}>
        {children}
      </GoogleOAuthProvider>
    </>
  );
};

export default GlobalLayout;

