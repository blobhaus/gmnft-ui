import Image from 'next/image'
import Link from 'next/link'
import { GM } from '../types'
import { formatAddress } from '../utils'

interface GMCardProps {
  gm: GM
}

const GMCard: React.FC<GMCardProps> = ({ gm }) => {
  const { image, name, ensName, address, balance, gms } = gm
  return (
    <div className="flex flex-col items-center gap-4 border border-gray-400 rounded-lg p-7 shadow-sm">
      <div className="w-64 h-64 flex justify-center items-center">
        {image && balance > 0 ? (
          <Image
            src={image}
            width={300}
            height={300}
            alt={`${ensName ?? `Address ${address}`}: ${gms} gm(s)`}
          />
        ) : (
          <p className="italic text-gray-800">Token balance 0</p>
        )}
      </div>
      <h1 className="font-serif text-3xl text-gray-900">{name}</h1>
      <Link href={`/${address}`}>
        <a>
          <h2 className="text-lg hover:underline">
            {ensName ? ensName : formatAddress(address)}
          </h2>
        </a>
      </Link>
    </div>
  )
}

export default GMCard
