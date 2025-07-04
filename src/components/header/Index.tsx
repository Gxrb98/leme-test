import logo from '../../assets/logo-leme.png'
import { Line, Logo } from './styles'

//const Head = styled.div``

export const Header = () => {
  return (
    <>
        <Logo src={logo} alt="Logo" />
        <Line/>
    </>
    
  )
}
