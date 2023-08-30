// ======= Calling Requirements ======= //
const router = require('express').Router()
const { regStudent, stuCreate } = require('../controller/studentCtrl')

// ====== Student Routes ====== //
router.route('/register').post(regStudent)
router.route('/create').post(stuCreate)



// ======= Invalid Routes ======= //
// mngRouter.get('*', )

module.exports = router;