import { GoMarkGithub } from 'react-icons/go'

const Footer: React.FC = () => {
  return (
    <footer className="w-screen mt-11">
      <div className="mx-12 border-t border-gray-300 flex justify-between px-5 py-6 ">
        <div></div>
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://github.com/mikko-o/gmnft-ui"
            target="_blank"
            rel="noreferrer"
          >
            <GoMarkGithub size="24" />
          </a>

          <a
            className="text-sm text-gray-700"
            href="https://etherscan.io/address/0x355ab8d97eafe30d7063d62befe192a0c88fe424"
            target="_blank"
            rel="noreferrer"
          >
            Contract
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
