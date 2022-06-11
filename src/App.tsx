import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Container from './components/Container'
// import useWallet from "./hooks/useWallet";
import abi from './utils/WavePortal.json'
import Footer from './components/Footer'
import logo from './assets/logo.svg'
import { UserIcon, LightningBoltIcon } from '@heroicons/react/outline'
import Loading from './components/Loading'

function App() {
  const [currentAccount, setCurrentAccount] = useState()
  const [totalVotes, setTotalVotes] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const contractAddress = '0xC57E78357168FeC276367B9DcA686bD4C79BAb28'
  const contractABI = abi.abi

  const wave = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
        /**
         * execute wave from smat contract
         */
        const waveTxn = await wavePortalContract.wave("I'm the first wave!")
        console.log('Mining...', waveTxn.hash)
        setIsLoading(true)
        await waveTxn.wait()
        console.log('Mined -- ', waveTxn.hash)
        setIsLoading(false)
        count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
        setTotalVotes(count.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }
  // const isConnected = useWallet();
  const getTotalWaves = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await wavePortalContract.getTotalWaves()
        console.log('Retrieved total wave count...', count.toNumber())
        setTotalVotes(count.toNumber())
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTotalWaves()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalVotes])

  const connectWallet = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window
      if (!ethereum) {
        alert('Get metamask')
        return
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      setCurrentAccount(accounts[0])
      console.log('connected', accounts[0])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="bg-gradient-to-b from-cyan-50 to-teal-100 font-mono antialiased">
      <Container>
        <header className="fixed inset-x-0 h-12 bg-teal-600/10 backdrop-blur-sm">
          <div className="flex h-12 items-center justify-between px-4 lg:mx-auto lg:max-w-4xl">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Wave Portal" className="h-8 w-8 rounded" />
              <span className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-teal-500 bg-clip-text text-xl font-bold text-transparent">
                wavePortal
              </span>
            </div>
            <div className="flex items-center">
              {currentAccount ? (
                <button className="relative flex h-8 max-w-[96px] items-center justify-center bg-cyan-500 px-2 text-white transition-all before:absolute before:top-0.5 before:left-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 hover:bg-slate-700 hover:before:bg-teal-300">
                  <UserIcon className="h-6 w-6 shrink-0" />
                  <span className="truncate">{currentAccount}</span>
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="relative flex h-8 items-center justify-center bg-cyan-800 px-2 text-white transition-all before:absolute before:top-0.5 before:left-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400 hover:bg-slate-700 hover:before:bg-teal-300"
                >
                  <LightningBoltIcon className="h-6 w-6" />
                  <span className="hidden sm:block">Login</span>
                </button>
              )}
            </div>
          </div>
        </header>
        <main className="mt-14 w-full flex-1 px-4 lg:mx-auto lg:max-w-4xl">
          <h1 className="mt-1 mb-2 text-center text-3xl font-bold sm:text-left">
            👋{' '}
            <span className="bg-gradient-to-r from-cyan-700 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
              Hey there!
            </span>
          </h1>
          <div className="mt-4 text-center sm:text-left">
            <p className="mb-2">I am frasty and trying to get started with Web3 development.</p>
            <p className="mb-2">Connect your Ethereum wallet and wave at me!</p>
          </div>
          <div className="relative mt-4 mb-8 bg-cyan-600 px-2 py-1 before:absolute before:top-0.5 before:left-0.5 before:z-[-1] before:h-full before:w-full before:bg-teal-400">
            {totalVotes && (
              <div className="space-x-2 text-sm">
                <span className="text-cyan-300">Total Waves:</span>
                <span className="font-bold text-cyan-200">{totalVotes}</span>
              </div>
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <button
                className="h-12 border-2 border-black bg-teal-400 px-6 font-semibold uppercase tracking-wider text-black"
                onClick={wave}
              >
                Wave at me
              </button>
            </div>
          )}
        </main>
        <Footer wavesCount={totalVotes} />
      </Container>
    </div>
  )
}

export default App
