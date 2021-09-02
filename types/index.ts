import { BigNumber } from 'ethers'

export interface GMEventArgs<T> {
  sender: string
  gmTotal: T
  senderGMTotal: T
}

export interface GM {
  address: string
  balance: number
  ensName?: string
  gms?: number
  image?: string
  name?: string
}
