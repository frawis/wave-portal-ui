import React from "react";
import { ethers } from "ethers";
import Container from "./components/Container";

function App() {
  const wave = () => {};
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <Container>
        <header className="App-header">
          <h1 className="text-3xl font-bold underline">👋 Hey there!</h1>
        </header>
        <main className="flex-1">
          <div className="">
            I am frasty. Connect your Ethereum wallet and wave at me!
          </div>
          <button
            className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
            onClick={wave}
          >
            Wave at me
          </button>
        </main>
        <footer></footer>
      </Container>
    </div>
  );
}

export default App;
