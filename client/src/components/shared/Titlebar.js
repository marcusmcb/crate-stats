import { Link } from "react-router-dom";
import './titlebar.css'

const Titlebar = () => {

  let title = 'crate<>stats'

  return (
    <div className='titlebar'>
      <Link style={{color: 'black'}} to={'/pageselect'}>{title}</Link>
      </div>
  )
}

export default Titlebar