// import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="content">
      {children}
      {/* <Footer /> */}
    </div>
  )
}

export default Layout
