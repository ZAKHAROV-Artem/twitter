import Layout from "@/components/Layout";
import TweetModal from "@/components/modals/TweetModal";
import SignInModal from "@/components/modals/SignInModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import localFont from "next/font/local";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const twitter = localFont({ src: "../public/fonts/Twitter.woff2" });
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className={twitter.className}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <TweetModal />
          <SignInModal />
          <RegisterModal />
          <EditProfileModal />
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </SessionProvider>
    </div>
  );
}
