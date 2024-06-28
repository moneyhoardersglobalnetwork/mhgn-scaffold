/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useGlobalState } from "~~/services/store/store";
import { web3AuthInstance } from "~~/services/web3/wagmiConnectors";

const Home: NextPage = () => {
  const setUserInfo = useGlobalState(state => state.setUserInfo);
  const { connector } = useAccount();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (web3AuthInstance) {
          const userInfo = await web3AuthInstance.getUserInfo();
          console.log(userInfo);
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserInfo();
  }, [connector]);

  return (
    <>
      <MetaHeader />
      <div className="flex bg-black items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">MHGN Scaffold</span>
          </h1>
          <p className="text-center text-lg">
            Now with Web3Auth, you can connect to the Hoarding Gateway with social accounts.{" "}
            <div>
              We are working hard to bring a full production release of the MHGN Hoarding Gateway to Polygon Mainnet.
            </div>
          </p>
          <p className="text-center text-lg">
            The MHGN Scaffold is a starting point for dapp development devs can easily deploy and test their dapps.
          </p>
        </div>

        <div className="flex-grow bg-black w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-purple-800 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-warning" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-purple-800 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-warning" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div>
            <div className="flex flex-col bg-purple-800 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-warning" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
