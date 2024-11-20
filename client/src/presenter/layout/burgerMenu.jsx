import { Link } from 'react-router-dom'

function BurgerMenu({isVisible})
 {
  return(
    <div className={isVisible ? 'burgerShow' : 'burgerHide'}>
        <nav>
        <ul>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <Link to="/specs">Specs</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li><Link to="/">Log out</Link></li>
        </ul>
      </nav>
    </div>
  )
};

export default BurgerMenu;