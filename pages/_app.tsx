import Layout from "@/components/Layout";
import TweetModal from "@/components/modals/TweetModal";
import SignInModal from "@/components/modals/SignInModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { data: user } = useCurrentUser();
  return (
    <SessionProvider session={session}>
      <TweetModal />
      {!user && (
        <>
          <SignInModal />
          <RegisterModal />
        </>
      )}
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
