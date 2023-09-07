// ======= Calling Requirements ======= //
const router = require('express').Router()

// ===== Registering Controllers ===== //
const { adminLogout, adminHome, regAdmin, logInAdmin, getStudents, oneStaff, oneStudent, getStaffs, notAdmitted, notEmployed, deleteStudent, studentUpdate, staffUpdate, staffDelete, staffPortal, studentPortal } = require('../controller/mngCtrl')

// ========== Authentication MiddleWares =========== //

const { forAdmin, adminAccess } = require('../middleware/adminAuth')
const { currentAdmin, naAdmin } = require('../middleware/adminUserChecker')

// ====== Management Routes ====== //

router.route('/logout').get(adminLogout)
router.route('/home').get(forAdmin, currentAdmin, adminHome)
router.route('/register').post(forAdmin, currentAdmin, regAdmin)
router.route('/login').post(logInAdmin)
router.route('/all-students').get(adminAccess, naAdmin, getStudents)
router.route('/all-staffs').get(adminAccess, naAdmin, getStaffs)
router.route('/students/:id').get(adminAccess, naAdmin, oneStudent).delete(adminAccess, naAdmin, deleteStudent).put(adminAccess, naAdmin, studentUpdate)
router.route('/staffs/:id').get( adminAccess, naAdmin, oneStaff).put(adminAccess, naAdmin, staffUpdate).delete(adminAccess, naAdmin, staffDelete)
router.route('/not-admitted').get(adminAccess, naAdmin, notAdmitted)
router.route('/not-employed').get(adminAccess, naAdmin, notEmployed)
router.route('/created-staff').get(staffPortal)
router.route('/created-student').get(studentPortal)


// ======= Invalid Routes ======= //
// mngRouter.get('*', )

module.exports = router;