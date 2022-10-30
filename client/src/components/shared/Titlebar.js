import { Link } from "react-router-dom";
import './style/titlebar.css'

const Titlebar = () => {

  let title = 'crate<>stats'

  return (
    <div className='titlebar'>
      <Link style={{color: 'black'}} to={'/'}>{title}</Link>
      </div>
  )
}

export default Titlebar