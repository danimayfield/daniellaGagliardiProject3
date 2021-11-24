import logo from './sprinklingRainbowsLogoWhite.png'
function Header() {

  
    return (
        <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        
        <img src={logo} alt="Sprinkling Rainbows Shop Logo" className="logo"/>
      </header>
    );
}

export default Header