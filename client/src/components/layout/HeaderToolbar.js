import Navbar from './Navbar';
import Menubar from './Menubar';

const HeaderToolbar = () => {

  return (
    <div className='header-toolbar bg-dark'>
      <Navbar />
      <Menubar />
    </div>
  )
}

export default HeaderToolbar