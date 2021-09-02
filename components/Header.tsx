import ConnectWallet from './ConnectWallet'
import GM from './GM'
import Web3Provider from './Web3Provider'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { InjectedConnector } from '@web3-react/injected-connector'

function getLibrary(
  provider: any,
  connector:
    | Required<
        Web3ReactContextInterface<ethers.providers.Web3Provider>
      >['connector']
    | undefined
) {
  return new ethers.providers.Web3Provider(provider) // this will vary according to whether you use e.g. ethers or web3.js
}

interface HeaderProps {
  HeaderLeft?: React.FC
}

const Header: React.FC<HeaderProps> = ({ HeaderLeft }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Provider>
        <header>
          <nav className="flex w-full items-center h-20 justify-between">
            <div className="font-serif text-4xl ml-10 text-gray-800">
              {HeaderLeft ? <HeaderLeft /> : null}
            </div>
            <div className="mr-16 flex items-center gap-2">
              <GM />
              <ConnectWallet />
            </div>
          </nav>
        </header>
      </Web3Provider>
    </Web3ReactProvider>
  )
}

export default Header
