"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CustomImage from "@/components/CustomImage";
import LoaderButton from "@/components/button/LoaderButton";
import { InputType } from "@/components/form/InputType";
import { Form } from "@/components/ui/form";
import { useUserForgetPassHandler } from "@/hooks/auth.hook";
import { IRootState } from "@/store";

export default function ForgetPassword() {
  const { form, handleForgetPassEmail, isLoading } = useUserForgetPassHandler();
  const { settings } = useSelector((state: IRootState) => state.common.data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
      >
        <div>
          <Link href="/" className="flex justify-center">
            <span className="sr-only">Your Company</span>
            <img
              className="h-12 w-auto"
              src={settings?.site_logo || "/images/logo.png"}
              alt="Company Logo"
            />
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Password Recovery
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email to recover your password
          </p>
        </div>
        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleForgetPassEmail)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <InputType
                form={form}
                formName="email"
                formLabel="Email address"
                formPlaceholder="Enter your email"
                type="email"
                className="rounded-md"
              />
            </div>

            <LoaderButton
              buttonText="Recover Password"
              isLoading={isLoading}
              loaderText="Sending recovery email..."
              classNames="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

