import { BigNumber, ethers, utils } from 'ethers'
import { GM, GMEventArgs } from '../types'
import { GMNFT, GMNFT__factory } from '../types/ethers-contracts'

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.JSON_RPC_URL
)

export const gmNft = GMNFT__factory.connect(
  '0x355AB8D97EaFE30d7063D62bEFe192A0c88fe424',
  provider
)

const filter = {
  address: '0x355AB8D97EaFE30d7063D62bEFe192A0c88fe424',
  topics: [utils.id('gm(address,uint256,uint256)')],
}

export const getLatestEvents = async (blockRange: number) => {
  const latestBlock = await provider.getBlockNumber()
  const data = await gmNft.queryFilter<
    [string, BigNumber, BigNumber],
    GMEventArgs<BigNumber>
  >(filter, latestBlock - blockRange, latestBlock)
  return data.reverse()
}
export const getTokenURI = async (address: string) => {
  const tokenID = await gmNft.tokenOfOwnerByIndex(address, 0)
  const tokenURI = await gmNft.tokenURI(tokenID)
  return tokenURI
}

export const getGM = async (address: string) => {
  const balance = (await gmNft.balanceOf(address)).toNumber()
  if (balance === 0) return { address, balance }
  const pGMs = gmNft.gms(address)
  const pTokenURI = getTokenURI(address)
  const [gms, tokenURI] = await Promise.all([pGMs, pTokenURI])
  const { image, name } = decodeURI(tokenURI)
  return { address, gms: gms.toNumber(), image, name, balance }
}

export const getLatestGM = async (): Promise<GM> => {
  const address = await gmNft.latestGM()
  return getGM(address)
}

export const abiCoder = new ethers.utils.AbiCoder()

export const decodeURI = (uri: string) =>
  JSON.parse(new Buffer(uri.split(',')[1], 'base64').toString('ascii'))

export const formatAddress = (addr: string) =>
  `${addr.substring(0, 4)}-${addr.substring(addr.length - 4)}`
