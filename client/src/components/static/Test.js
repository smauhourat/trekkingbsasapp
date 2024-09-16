import React from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api';

const Test = () => {
    
    api.get(`/tests/`).then((res) => console.log(res))

      return (
        <section className="container">
            <div className="bg-body-gray rounded p-5">
                    <h1>Gracias, su reserva fue procesada de forma exitosa!!!</h1>
                    <p className="mt-10">Para completar el proceso, realice la <strong>Transferencia o Deposito</strong> informando el nro. de transaccion al mail ventas@trekkingbuenosaires.com.ar</p>
                    <div className="mt-25"></div>
                    <h2>COD RESERVA: TRK001</h2>
                    <div className="mt-25"></div>
                    <div className="fit-content bg-body-gray-500 rounded p-5">
                      <h3>Banco Nacion</h3>
                      <p>Cuenta Corriente $ Nro 58899-6548</p>
                      <h3>Banco Galicia</h3>
                      <p>Cuenta Corriente $ Nro 99-6548</p>
                      <p>Cuenta Corriente u$s Nro 00-9876548</p>
                    </div>
                    <Link to='/books' className="btn btn-success mt-15">
                        Ver Reservas
                    </Link>
            </div>            
        </section>
      )
}

export default Test
