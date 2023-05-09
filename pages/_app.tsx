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
const twitter = localFont({ src: "../public/fonts/Twitter.woff2" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { isLoading } = useCurrentUser();
  if (isLoading) return null;
  return (
    <div className={twitter.className}>
      <SessionProvider session={session}>
        <TweetModal />
        <SignInModal />
        <RegisterModal />
        <EditProfileModal />
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  );
}
