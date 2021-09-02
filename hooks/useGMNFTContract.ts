import { ethers, Signer } from 'ethers'
import { useContext, useMemo } from 'react'
import { Web3Context } from '../components/Web3Provider'
import { GMNFT__factory } from '../types/ethers-contracts'

const useGMNFTContract = (
  provider?:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | Signer
) => {
  const GMNFT = useMemo(
    () =>
      provider
        ? GMNFT__factory.connect(
            '0x355AB8D97EaFE30d7063D62bEFe192A0c88fe424',
            provider
          )
        : undefined,
    [provider]
  )
  return GMNFT
}

export default useGMNFTContract
