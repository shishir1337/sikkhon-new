"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CustomImage from "@/components/CustomImage";
import LoaderButton from "@/components/button/LoaderButton";
import { InputType } from "@/components/form/InputType";
import { Form } from "@/components/ui/form";
import { useUserResetPassHandler } from "@/hooks/auth.hook";
import { IRootState } from "@/store";

export default function ResetPassword() {
  const { form, handleResetPassEmail, isLoading } = useUserResetPassHandler();
  const { settings } = useSelector((state: IRootState) => state.common.data);

  const searchParams = useSearchParams();
  const oldEmail = searchParams.get("email");

  useEffect(() => {
    if (oldEmail) {
      form.setValue("email", oldEmail);
    }
  }, [oldEmail, form]);

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
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email, code, and new password to reset your account
          </p>
        </div>
        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleResetPassEmail)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <InputType
                form={form}
                formName="email"
                formLabel="Email address"
                formPlaceholder="Enter your email"
                type="email"
                className="rounded-t-md"
              />
              <InputType
                form={form}
                formName="code"
                formLabel="Verification Code"
                formPlaceholder="Enter verification code"
              />
              <InputType
                form={form}
                formName="password"
                formLabel="New Password"
                formPlaceholder="Enter new password"
                type="password"
              />
              <InputType
                form={form}
                formName="confirmPassword"
                formLabel="Confirm New Password"
                formPlaceholder="Confirm new password"
                type="password"
                className="rounded-b-md"
              />
            </div>

            <LoaderButton
              buttonText="Reset Password"
              isLoading={isLoading}
              loaderText="Resetting..."
              classNames="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

