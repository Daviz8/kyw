"use client";

import  { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";


 const clientId =  `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;

interface GoogleOAuthProviderWrapperProps {
  children: ReactNode;
}

export default function GoogleOAuthProviderWrapper({ children }: GoogleOAuthProviderWrapperProps) {

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}