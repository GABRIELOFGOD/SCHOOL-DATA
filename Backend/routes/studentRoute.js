// ======= Calling Requirements ======= //
const router = require('express').Router()
const { regStudent, stuCreate, studentLogin } = require('../controller/studentCtrl')

// ====== Student Routes ====== //
router.route('/register').post(regStudent)
router.route('/create').post(stuCreate)
router.route('/login').post(studentLogin)



// ======= Invalid Routes ======= //
// mngRouter.get('*', )

module.exports = router;