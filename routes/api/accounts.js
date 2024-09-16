const mongoose = require('mongoose');
const express = require('express');
const authAdmin = require('../../middleware/authAdmin');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Account = require('../../models/Account');
const router = express.Router();

// @route   POST api/accounts
// @desc    Add Account
// @access  Private
router.post('/',
    [authAdmin],
    [
        check('bank', 'Debe ingresar el Banco/Entidad').not().isEmpty(),
        check('currency', 'Debe ingresar el tipo de moneda').not().isEmpty(),
        check('account_type', 'Debe ingresar el tipo de Cuenta (CA o CC)').not().isEmpty(),
        check('account_number', 'Debe ingresar el Nro de Cuenta').not().isEmpty(),
        check('account_cbu', 'Debe ingresar el CBU/CVU').not().isEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { bank, currency, account_type, account_number, account_cbu, account_alias } = req.body;

        try {
            const account = await new Account({
                bank, currency, account_type, account_number, account_cbu, account_alias
            }).save()

            res.json(account)
        }
        catch (err) {
            console.error(err)
            res.status(500).send(err)
        }
    })

// @route   GET api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/',
    auth,
    async (_req, res) => {
        try {
            const accounts = await Account
                .find({ super_admin: true })
                .sort({ createdAt: 'asc' })

            res.json({
                metadata: {
                    count: accounts.length
                },
                data: accounts
            })

            if (!accounts) {
                return res.status(404).json({ msg: 'Cuentas no encontradas' })
            }
        } catch (err) {
            console.error(err.message)

            res.status(500).send('Server Error')
        }
    })

module.exports = router