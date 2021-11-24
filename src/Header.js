import logo from './sprinklingRainbowsLogoWhite.png'
function Header() {

  
    return (
        <header>
        <nav>
          <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./index.html">About</a></li>
            <li><a href="./index.html">Contact</a></li>
          </ul>
        </nav>
        
        <img src={logo} alt="Sprinkling Rainbows Shop Logo" className="logo"/>
      </header>
    );
}

export default Header