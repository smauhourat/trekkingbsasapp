import React, { useState } from "react";


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log('SUCCESS');
    }

  return (
    <section className="container">
      <div className="alert alert-danger">
        Credenciales inválidas
      </div>
      <h1 className="large text-primary">Ingreso</h1>
      <p className="lead"><i className="fas fa-user"></i> Ingrese a su cuenta</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Ingresar" />
      </form>
    </section>
  );
};


export default Login;