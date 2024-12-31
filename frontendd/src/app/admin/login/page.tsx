"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import CustomImage from "@/components/CustomImage";
import LoaderButton from "@/components/button/LoaderButton";
import { InputType } from "@/components/form/InputType";
import { Form } from "@/components/ui/form";
import { useLoginHandler } from "@/hooks/auth.hook";
import { IRootState } from "@/store";

const demoUsers = [
  { name: "Admin", email: "admin@sikkhon.com", password: "123456" },
];

export default function AdminLogin() {
  const { form, handleLogin, isLoading } = useLoginHandler();
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  const selectDemoUser = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
    handleLogin({
      email: email,
      password: password,
    });
  };

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
            Admin Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to login
          </p>
        </div>
        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(handleLogin)}>
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
                formName="password"
                formLabel="Password"
                formPlaceholder="Enter your password"
                type="password"
                className="rounded-b-md"
              />
            </div>

            <LoaderButton
              buttonText="Sign In"
              isLoading={isLoading}
              loaderText="Signing In..."
              classNames="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </form>
        </Form>

        <div className="mt-6">
          <button
            onClick={() => setShowDemoUsers(!showDemoUsers)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showDemoUsers ? 'Hide Demo User' : 'Show Demo User'}
          </button>
        </div>

        {showDemoUsers && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Password</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {demoUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.password}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => selectDemoUser(user.email, user.password)}
                        className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                      >
                        Use
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

