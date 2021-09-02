import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useGMNFTContract from './useGMNFTContract'

const useMintStatus = (
  provider:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider
    | undefined,
  address: string | null | undefined
) => {
  const contract = useGMNFTContract(provider)
  const [hasToken, setHasToken] = useState<boolean | undefined>(undefined)
  useEffect(() => {
    if (contract && address) {
      contract.balanceOf(address).then((balance) => setHasToken(balance.gt(0)))
    }
  }, [contract, address])
  return { hasToken }
}

export default useMintStatus
