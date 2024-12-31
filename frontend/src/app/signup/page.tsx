"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CustomImage from "@/components/CustomImage";
import LoaderButton from "@/components/button/LoaderButton";
import { InputType } from "@/components/form/InputType";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { useUserSignUpHandler } from "@/hooks/auth.hook";
import { errorToast } from "@/lib/helper";
import { IRootState } from "@/store";

export default function SignUp() {
  const { form, handleSignUp, isLoading } = useUserSignUpHandler();
  const { settings } = useSelector((state: IRootState) => state.common.data);

  const [isTermsAndConditionClicked, setIsTermsAndConditionClicked] = useState(false);
  const [isPrivacyPolicyClicked, setIsPrivacyPolicyClicked] = useState(false);

  const handleSignUpForm = (value: any) => {
    if (settings?.privacy_policy_status == 1 && !isPrivacyPolicyClicked) {
      errorToast("Please accept the privacy policy.");
      return;
    }
    if (settings?.terms_condition_status == 1 && !isTermsAndConditionClicked) {
      errorToast("Please accept the terms and conditions.");
      return;
    }

    handleSignUp(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full space-y-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl"
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
            Create your account
          </h2>
        </div>
        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleSignUpForm)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputType
                  form={form}
                  formName="first_name"
                  formLabel="First Name"
                  formPlaceholder="Enter First Name"
                  className="rounded-tl-md"
                />
                <InputType
                  form={form}
                  formName="last_name"
                  formLabel="Last Name"
                  formPlaceholder="Enter Last Name"
                  className="rounded-tr-md"
                />
              </div>
              <InputType
                form={form}
                formName="user_name"
                formLabel="Username"
                formPlaceholder="Enter Username"
              />
              <InputType
                form={form}
                formName="email"
                formLabel="Email address"
                formPlaceholder="Enter Email"
                type="email"
              />
              <InputType
                form={form}
                formName="password"
                formLabel="Password"
                formPlaceholder="Enter Password"
                type="password"
                className="rounded-b-md"
              />
            </div>

            <div className="space-y-4">
              {settings?.privacy_policy_status == 1 && (
                <div className="flex items-center">
                  <Checkbox
                    id="privacy-policy"
                    onCheckedChange={(value) => setIsPrivacyPolicyClicked(!!value)}
                    checked={isPrivacyPolicyClicked}
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    I agree to the{" "}
                    <Link href="/privacy-policy" className="text-indigo-600 hover:text-indigo-500" target="_blank">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              )}

              {settings?.terms_condition_status == 1 && (
                <div className="flex items-center">
                  <Checkbox
                    id="terms-and-conditions"
                    onCheckedChange={(value) => setIsTermsAndConditionClicked(!!value)}
                    checked={isTermsAndConditionClicked}
                  />
                  <label htmlFor="terms-and-conditions" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms-and-conditions" className="text-indigo-600 hover:text-indigo-500" target="_blank">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              )}
            </div>

            <LoaderButton
              buttonText="Sign Up"
              isLoading={isLoading}
              loaderText="Creating account..."
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
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign up with Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>

            <a
              href="#"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Sign up with Google</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

