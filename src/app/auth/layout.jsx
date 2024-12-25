export default function AuthLayout({ children }) {
    return (
      <div className="w-screen h-screen flex flex-col">
        <nav className="border">
          <img src="/logo/logo.svg" className="border h-10" />
        </nav>
        <div className="flex flex-row flex-grow w-full">
          {/* Container for centering children */}
          <div className="flex-grow flex items-center justify-center h-full">
            {children}
          </div>
  
          {/* Sidebar */}
          <div className="w-3/4 border flex items-center justify-center">
            <p className="text-7xl">{`</DOC>`}</p>
          </div>
        </div>
      </div>
    );
  }
  