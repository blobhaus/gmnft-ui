import { ethers } from 'ethers'
import { ExternalProvider } from '@ethersproject/providers'
import Web3Modal, { getInjectedProvider } from 'web3modal'
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { TypeScriptConfig } from 'next/dist/server/config-shared'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'

interface Web3ProviderProps {
  children: ReactNode
}

interface Web3ContextProps {
  connect: () => void
  loading: boolean
  ensName: string | null
}

const providerOptions = {}

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: false,
  providerOptions,
})

export const Web3Context = createContext<Web3ContextProps>({
  connect: () => {},
  loading: false,
  ensName: null,
})

interface Web3ProviderInstance {
  on: typeof web3Modal.on
}

const injected = new InjectedConnector({ supportedChainIds: [1] })

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const { activate, account, active, chainId, library } = useWeb3React()

  const connect = () =>
    activate(injected, console.log, true).catch((e) => {
      console.log(e)
      setLoading(false)
    })

  const [loading, setLoading] = useState(false)

  const [ensName, setEnsName] = useState<string | null>(null)

  useEffect(() => {
    const getName = async () => {
      if (library && account) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 5000)
        const name = await library.lookupAddress(account)
        setEnsName(name)
        setLoading(false)
      }
    }
    getName()
  }, [account, library])

  useEffect(() => {
    if (!active) setEnsName(null)
  }, [active])

  return (
    <Web3Context.Provider
      value={{
        connect,
        loading,
        ensName,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default Web3Provider
