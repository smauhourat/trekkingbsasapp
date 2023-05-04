import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Maintenance = (props) => {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    console.log('componente de MANTENIMIENTO')
    const getAppConf = async () => {
      const res = await api.get('/appconf');
      console.log(res);
      setOnline(res.online);
    };
  
    getAppConf();
  }, [online]);

  return (
    <>
        {/* <h1>ONLINE: {online?.toString()}</h1> */}
        {props.children}
        {/* {online ? (
          props.children  
        ) : (
          <h1>Disculpe las molestas, el sitio se encuentra en Mantenimiento.</h1>
        )} */}
    </>
  )  
}

export default Maintenance;