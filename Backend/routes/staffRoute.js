// ======= Calling Requirements ======= //
const router = require('express').Router()
const { regStaff, createStaff, staffLogIn } = require('../controller/staffCtrl')

// ====== Staffs Routes ====== //
router.route('/register').post(regStaff)
router.route('/create').post(createStaff)
router.route('/login').post(staffLogIn)


// ======= Invalid Routes ======= //
// mngRouter.get('*', )

module.exports = router;