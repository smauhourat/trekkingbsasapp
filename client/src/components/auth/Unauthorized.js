import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate('/');

    return (
        <section className='container'>
            <h1>Acceso no Autorizado</h1>
            <br />
            <p>Usted no tiene permisos para ver esta pagina</p>
            <div className="mt-15">
                <button className='btn btn-primary' onClick={goBack}>Volver</button>
            </div>
        </section>
    )
}

export default Unauthorized
