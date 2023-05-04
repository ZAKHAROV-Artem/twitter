import Layout from "@/components/Layout";
import TweetModal from "@/components/modals/TweetModal";
import SignInModal from "@/components/modals/SignInModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TweetModal />
      <SignInModal />
      <RegisterModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
