// ======= Calling Requirements ======= //
const router = require('express').Router()

// ===== Registering Controllers ===== //
const { regAdmin, logInAdmin, getStudents, oneStaff, oneStudent, getStaffs, notAdmitted, notEmployed, deleteStudent, studentUpdate, staffUpdate, staffDelete } = require('../controller/mngCtrl')

// ========== Authentication MiddleWares =========== //

const { forAdmin } = require('../middleware/adminAuth')
// ====== Management Routes ====== //

router.route('/register', forAdmin).post(regAdmin)
router.route('/login').post(logInAdmin)
router.route('/all-students').get(getStudents)
router.route('/all-staffs').get(getStaffs)
router.route('/students/:id').get(oneStudent).delete(deleteStudent).put(studentUpdate)
router.route('/staffs/:id').get(oneStaff).put(staffUpdate).delete(staffDelete)
router.route('/not-admitted').get(notAdmitted)
router.route('/not-employed').get(notEmployed)


// ======= Invalid Routes ======= //
// mngRouter.get('*', )

module.exports = router;