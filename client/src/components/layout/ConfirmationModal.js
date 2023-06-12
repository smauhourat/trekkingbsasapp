import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const ConfirmationModal = ({ show, message, params, onCancel, onOk }) => {

  const showHideClassName = show ? "block" : "none";

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: showHideClassName,
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "20px",
          borderRadius: "5px"
        }}
      >
        <h3>{message}</h3>
        <h3>{params}<br></br></h3>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className="btn btn-default" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-success" onClick={(e) => onOk(params)}>Aceptar</button>
        </div>
      </div>

    </div>

  )

}

export default ConfirmationModal