const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Member = require('../../models/Member');


// @route   POST api/members
// @desc    Add Member
// @access  Private
router.post('/',
    [
        auth,
        [
            check('first_name', 'Nombre es requerido').not().isEmpty(),
            check('last_name', 'Apellido es requerido').not().isEmpty(),
            check('dni', 'DNI es requerido').not().isEmpty(),
            check('phone', 'Celular es requerido').not().isEmpty(),
            check('birth_date', 'Fecha Nac. es requerido').not().isEmpty(),
            check('email', 'Email es requerido').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, email, dni, phone, birth_date, medical_status } = req.body;

        try {

            let memberByEmail = await Member.findOne({ email: email });

            if (memberByEmail) {
                return res.status(400).json({ errors: [{ msg: 'El email ya existe' }] })
            }

            let newMember = new Member({
                first_name, last_name, email, dni, phone, birth_date, medical_status
            });

            const member = await newMember.save();
            res.json(member);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }

    }
);

// @route    DELETE api/members/:id
// @desc     Delete a Member
// @access   Private
router.delete('/:id',
    auth,
    checkObjectId('id'),
    async (req, res) => {
        try {
            const member = await Member.findById(req.params.id);

            if (!member) {
                return res.status(404).json({ msg: 'Miembro no encontrado' });
            }

            await member.remove();

            res.json({ msg: 'Miembro eliminado' });
        } catch (err) {
            console.error(err.message);

            return res.status(500).json({ msg: 'Server error' });
        }
    }
);

// @route   PUT api/members/:id
// @desc    Update Member
// @access  Private
router.put('/:id',
    checkObjectId('id'),
    [
        auth,
        [
            check('first_name', 'Nombre es requerido').not().isEmpty(),
            check('last_name', 'Apellido es requerido').not().isEmpty(),
            check('dni', 'DNI es requerido').not().isEmpty(),
            check('phone', 'Celular es requerido').not().isEmpty(),
            check('birth_date', 'Fecha Nac. es requerido').not().isEmpty(),
            check('email', 'Email es requerido').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(member);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }

    }
);

// @route    GET api/members/:id
// @desc     Get member by id
// @access   Public
router.get('/:id',
    checkObjectId('id'),
    async (req, res) => {
        try {
            const member = await Member.findById(req.params.id);

            if (!member) {
                return res.status(404).json({ msg: 'Miembro no encontrado' });
            }

            res.json(member);
        } catch (err) {
            console.error(err.message);

            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/members
// @desc    Get all members
// @access  Private
router.get('/',
    auth,
    async (req, res) => {
        try {
            const query = req.query.q ? req.query.q : "";
            const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
            let page = 1;
            if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
                page = parseInt(req.query.page);
            const sort = req.query.sort ? req.query.sort : "date";
            const order = req.query.order ? req.query.order : "-1";

            let db_query = {
                $or: [
                    { first_name: { $regex: query, '$options': 'i' } },
                    { last_name: { $regex: query, '$options': 'i' } },
                    { email: { $regex: query, '$options': 'i' } },
                ]
            };

            const totalItems = await Member
                .find(db_query)
                .countDocuments();

            const members = await Member
                .find(db_query)
                .limit(limit)
                .skip(limit * (page - 1))
                .sort({ [sort]: order });

            res.json({
                "metadata": {
                    "query": query,
                    "total": totalItems,
                    "count": members.length,
                    "limit": limit,
                    "page": page
                },
                "data": members
            });

            if (!members) {
                return res.status(404).json({ msg: 'Miembros no encontrados' });
            }
        } catch (err) {
            console.error(err.message);

            res.status(500).send('Server Error');
        }
    });

module.exports = router;    