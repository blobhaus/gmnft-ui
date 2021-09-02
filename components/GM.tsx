import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useContext } from 'react'
import useGMNFTContract from '../hooks/useGMNFTContract'
import useMintStatus from '../hooks/useMintStatus'
import { Web3Context } from './Web3Provider'

const GM: React.FC = () => {
  const { library, account } = useWeb3React<ethers.providers.Web3Provider>()
  const signer = library?.getSigner()
  const GMNFT = useGMNFTContract(signer)
  const { hasToken } = useMintStatus(library, account)
  const onGM = () => {
    GMNFT?.sayGM('gm')
  }
  const onMint = () => {
    GMNFT?.claim()
  }
  if (hasToken === undefined || !account) return null
  return (
    <div className="flex items-center gap-2">
      <div className="border rounded-lg text-small text-gray-900 border-gray-400 py-1 px-3">
        <button className="font-serif" onClick={onGM}>
          gm
        </button>
      </div>
      {!hasToken ? (
        <div className="border rounded-lg text-small text-gray-900 border-gray-400 py-1 px-3">
          <button className="font-serif" onClick={onMint}>
            mint
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default GM
