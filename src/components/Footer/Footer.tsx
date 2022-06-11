type Props = {
  wavesCount: number
}

const Footer = ({ wavesCount }: Props) => {
  return (
    <footer className="bg-cyan-800">
      <div className="flex items-center justify-between py-2 px-4 lg:mx-auto lg:max-w-4xl">
        <div className="text-sm text-cyan-400">
          <span>&copy; by frasty</span>
        </div>
        <div className="text-sm space-x-1">
          {wavesCount > 0 && (
            <>
              <span className="text-cyan-300">Amount of waves:</span>
              <span className="text-cyan-200 font-medium">{wavesCount}</span>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
export default Footer
