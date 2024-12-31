"use client";

import * as React from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "@/store/index";
import GlobalLayout from "@/components/layout/global.layout";
import ProgressBarComp from "@/components/progress-bar/ProgressBarComp";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalLayout>
          {children}
          <ProgressBarComp />
          <ToastContainer />
        </GlobalLayout>
      </QueryClientProvider>
    </Provider>
  );
}

