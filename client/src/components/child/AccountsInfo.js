const AccountsInfo = ({ accounts }) => {

    return (
            <div className="fit-content bg-body-gray-500 rounded p-5">
                {accounts.map((account, rowIndex) => {
                    return (
                        <span key={rowIndex}>
                            <h3>{account.bank}</h3>
                            <p>{account.account_type} - {account.currency} Nro {account.account_number}</p>
                            <p>CBU: <strong>{account.account_cbu}</strong></p>
                            <p>Razon Social: <strong>{account.account_holder}</strong></p>
                            <p>CUIT: <strong>{account.account_cuit}</strong></p>
                            <p>Aias: <strong>{account.account_alias}</strong></p>
                            <div className="mt-15"></div>
                        </span>
                    )
                })}
            </div>
    )    
}

export default AccountsInfo