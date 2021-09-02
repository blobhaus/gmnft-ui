import { BigNumber } from 'ethers'
import { base64 } from 'ethers/lib/utils'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { parse } from 'svg-parser'
import styles from '../styles/Home.module.css'
import { GM, GMEventArgs } from '../types'
import { TypedEvent } from '../types/ethers-contracts/commons'
import {
  decodeURI,
  formatAddress,
  getLatestEvents,
  getLatestGM,
  gmNft,
  provider,
} from '../utils'
import { Suspense } from 'react'
import Footer from '../components/Footer'
import GMCard from '../components/GMCard'
const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

interface HomeProps {
  latestGM: GM
  gmTotal: number
  events: Array<GMEventArgs<number> & { ensName?: string; blockNumber: number }>
}

const Home: NextPage<HomeProps> = ({ latestGM, gmTotal, events }) => {
  const { image, name, ensName, address, balance } = latestGM
  return (
    <div className="flex flex-col">
      <Head>
        <title>gm | {ensName ?? formatAddress(address)}</title>
        <meta name="description" content="Say gm on the Ethereum blockchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen min-h-screen flex flex-col">
        <Header />
        <main className="flex flex-col md:justify-center items-center ">
          <div className="w-max grid grid-cols-1 md:grid-cols-2 md:items-center mt-2 font-serif gap-10 lg:gap-20">
            <GMCard gm={latestGM} />

            <div className="border border-gray-400 pl-7 pr-5 pt-5 rounded-lg flex flex-col">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-thin text-semibold pb-1 text-gray-600 font-sans">
                  Recent
                </h2>
                <div className="font-sans text-gray-800 border rounded-xl px-2 py-1 text-xs bg-gray-200">
                  {gmTotal} total
                </div>
              </div>

              <div className="flex text-xs font-mono flex-col divide-y divide-gray-400 max-h-96 overflow-auto pr-4">
                {events.length > 0 ? (
                  events.map(
                    ({ sender, blockNumber, senderGMTotal, ensName }) => (
                      <div
                        key={sender + '-' + blockNumber}
                        className="p-3 flex items-center justify-between gap-3"
                      >
                        <span>
                          <Link href={`/${sender}`}>
                            <a className="hover:underline">
                              {ensName ?? formatAddress(sender)}
                            </a>
                          </Link>
                        </span>
                        <span className="">{senderGMTotal}</span>
                      </div>
                    )
                  )
                ) : (
                  <p className="py-2"> no gms during the last 256 blocks </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const rLatestGM = getLatestGM()
  const rGMTotal = gmNft.gmTotal()
  const rEvents = getLatestEvents(256)
  const [latestGM, gmTotal, events] = await Promise.all([
    rLatestGM,
    rGMTotal,
    rEvents,
  ])
  const rEnsName = provider.lookupAddress(latestGM.address)
  const rEnsNames = Promise.all(
    events.map(({ args: { sender } }) => provider.lookupAddress(sender))
  )
  const [ensName, ensNames] = await Promise.all([rEnsName, rEnsNames])
  return {
    props: {
      latestGM: { ...latestGM, ensName },
      gmTotal: gmTotal.toNumber(),
      events: events
        .map(({ blockNumber, args: { sender, gmTotal, senderGMTotal } }) => ({
          sender,
          gmTotal: gmTotal.toNumber(),
          senderGMTotal: senderGMTotal.toNumber(),
          blockNumber,
        }))
        .map((event, i) => ({ ...event, ensName: ensNames[i] })),
    },
  }
}
