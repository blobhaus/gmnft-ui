import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import Footer from '../components/Footer'
import GMCard from '../components/GMCard'
import { GM } from '../types'
import { formatAddress, getGM, gmNft, provider } from '../utils'
const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
})

interface OwnerPagePageProps {
  data: GM
}

const OwnerPage: NextPage<OwnerPagePageProps> = ({ data }) => {
  const { address, balance, gms, ensName, image, name } = data
  return (
    <div>
      <Head>
        <title>gm ({gms})</title>
        <meta
          name="description"
          content={`gm - ${ensName ? ensName : formatAddress(address)}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen overflow-auto flex flex-col">
        <Header
          HeaderLeft={() => (
            <Link href="/">
              <a>
                <IoArrowBack size="32" />
              </a>
            </Link>
          )}
        />
        <main className="flex flex-col md:justify-center items-center ">
          <div className="mt-6">
            <GMCard gm={data} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}

export default OwnerPage

export const getServerSideProps: GetServerSideProps<
  OwnerPagePageProps,
  { address: string }
> = async (context) => {
  const address = context.params?.address
  if (!address)
    return {
      notFound: true,
    }
  const rData = getGM(address)
  const rEnsName = provider.lookupAddress(address)
  const [data, ensName] = await Promise.all([rData, rEnsName])
  return {
    props: {
      data: { ...data, ensName },
    },
  }
}
