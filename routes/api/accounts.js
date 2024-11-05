const mongoose = require('mongoose');
const express = require('express');
const authAdmin = require('../../middleware/authAdmin');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId')
const Account = require('../../models/Account');
const router = express.Router();
const logger = require('../../utils/logger')

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
        check('account_cbu', 'Debe ingresar el CBU/CVU').not().isEmpty(),
        check('account_holder', 'Debe ingresar la Razon Social').not().isEmpty(),
        check('account_cuit', 'Debe ingresar el CUIT').not().isEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { bank, currency, account_type, account_number, account_cbu, account_holder, account_cuit, account_alias, active } = req.body;

        try {
            const account = await new Account({
                bank, currency, account_type, account_number, account_cbu, account_holder, account_cuit, account_alias, active
            }).save()

            res.json(account)
            logger.info('Account added')
        }
        catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    })

// @route   PUT api/accounts/:id
// @desc    Update Account
// @access  Private
router.put('/:id',
    [authAdmin],
    checkObjectId('id'),
    [
        authAdmin,
        [
            check('bank', 'Debe ingresarr el Banco/Entidad').not().isEmpty(),
            check('currency', 'Debe ingresar el tipo de moneda').not().isEmpty(),
            check('account_type', 'Debe ingresar el tipo de Cuenta (CA o CC)').not().isEmpty(),
            check('account_number', 'Debe ingresar el Nro de Cuenta').not().isEmpty(),
            check('account_cbu', 'Debe ingresar el CBU/CVU').not().isEmpty(),
            check('account_holder', 'Debe ingresar la Razon Social').not().isEmpty(),
            check('account_cuit', 'Debe ingresar el CUIT').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { bank, currency, account_type, account_number, account_cbu, account_holder, account_cuit, account_alias, active } = req.body;

        try {
            const account = await Account.findByIdAndUpdate(req.params.id, { bank, currency, account_type, account_number, account_cbu, account_holder, account_cuit, account_alias, active }, { new: true })
            res.json(account)
        } catch (err) {
            console.error(err)
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send(err)
        }
    });

// @route   GET api/accounts
// @desc    Get all accounts
// @access  Private
router.get('/',
    [authAdmin],
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
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send('Server Error')
        }
    })


// @route    DELETE api/accounts/:id
// @desc     Delete a Account
// @access   Private
router.delete('/:id',
    [authAdmin],
    checkObjectId('id'),
    async (req, res) => {
        try {
            const account = await Account.findById(req.params.id);

            if (!account) {
                return res.status(404).json({ msg: 'Cuenta no encontrada' });
            }

            await account.remove();

            res.json({ msg: 'Cuenta eliminada' });
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            return res.status(500).json({ msg: 'Server error' });
        }
    }
);

// @route    GET api/accounts/:id
// @desc     Get account by Id
// @access   Private
router.get('/:id',
    [authAdmin],
    checkObjectId('id'),
    async (req, res) => {

        try {
            const account = await Account.findById(req.params.id)

            if (!account) {
                return res.status(404).json({ msg: 'Cuenta no encontrada' });
            }

            res.json(account);
        } catch (err) {
            console.error(err);
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(500).send('Server Error');
        }
    });


module.exports = router