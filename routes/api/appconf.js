const express = require('express')
const router = express.Router()
const AppConf = require('../../models/AppConf')

// @route    GET api/appconf
// @desc     Get App Configuration Properties
// @access   Public
router.get('/',
  async (req, res) => {
    try {
      const appconf = await AppConf.findOne()

      if (!appconf) {
        return res.status(404).json({ msg: 'No se encuentra la Configuracion de la Aplicacion' })
      }

      res.json(appconf)
    } catch (err) {
      console.error(err.message)

      res.status(500).send('Server Error')
    }
  })

module.exports = router
