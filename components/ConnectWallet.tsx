import { Menu, Transition } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { useContext } from 'react'
import { formatAddress } from '../utils'
import { Web3Context } from './Web3Provider'

const ConnectWallet: React.FC = () => {
  const { account } = useWeb3React()
  const { connect, ensName, loading } = useContext(Web3Context)
  const onConnectClick = async () => {
    connect()
  }
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="disabled:cursor-default text-sm py-2 px-3 bg-gray-200 rounded-lg">
      {loading ? (
        <div className="flex justify-center items-center px-6">
          <div className="animate-spin rounded-full h-5 w-5 border-b border-gray-800"></div>
        </div>
      ) : ensName || account ? (
        <Account account={account} ensName={ensName} />
      ) : (
        <button onClick={onConnectClick}>Connect</button>
      )}
    </div>
  )
}

export default ConnectWallet

const Account = ({
  ensName,
  account,
}: {
  ensName: string | null
  account: string | null | undefined
}) => {
  const { deactivate } = useWeb3React()
  return (
    <Menu>
      <Menu.Button>
        {ensName ? ensName : account ? formatAddress(account) : null}
      </Menu.Button>
      <Menu.Items className="absolute right-14 top-14 bg-white shadow-lg rounded-lg p-4">
        <Menu.Item>
          {({ active }) => (
            <button onClick={() => deactivate()}>Disconnect</button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
