"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useSelector } from "react-redux";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { motion } from "framer-motion";

import CustomImage from "@/components/CustomImage";
import GitHubLogin from "@/components/auth/github.comp";
import LoaderButton from "@/components/button/LoaderButton";
import { InputType } from "@/components/form/InputType";
import { Form } from "@/components/ui/form";
import { STATUS } from "@/constant/core";
import { useUserLoginHandler, useSignin } from "@/hooks/auth.hook";
import { errorToast } from "@/lib/helper";
import { IRootState } from "@/store";

const demoUsers = [
  { name: "Student", email: "student@sikkhon.com", password: "123456" },
  { name: "Instructor", email: "instructor@sikkhon.com", password: "123456" },
  { name: "Admin", email: "admin@sikkhon.com", password: "123456" },
];

export default function Login() {
  const { form, handleLogin, isLoading } = useUserLoginHandler();
  const router = useRouter();
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const { gLoading, handleGoogleLogin } = useSignin();
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  const selectDemoUser = (email: string, password: string) => {
    if (email === "admin@sikkhon.com") {
      router.push("/admin/login");
      return;
    }
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
            Sign in to your account
          </h2>
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/forget-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link>
              </div>
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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {Number(settings?.social_login_github_status) === STATUS.ACTIVE && (
              <GitHubLogin />
            )}
            {Number(settings?.social_login_google_status) === STATUS.ACTIVE && settings?.google_auth_client_id && (
              <GoogleLogin
                onSuccess={(credentialResponse: any) => {
                  handleGoogleLogin(
                    credentialResponse?.credential,
                    credentialResponse?.clientId
                  );
                }}
                onError={() => {
                  errorToast("Login Failed");
                }}
                useOneTap
                type="standard"
                theme="filled_blue"
                size="large"
                text="signin_with"
                shape="rectangular"
              />
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setShowDemoUsers(!showDemoUsers)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showDemoUsers ? 'Hide Demo Users' : 'Show Demo Users'}
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

