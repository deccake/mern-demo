import express from 'express'

import {register,login,updateUser,getUserDetails,getAllUser} from '../controller/user.js'

const router = express.Router()


router.post('/register', register)
router.post('/login', login)

router.put('/getUserDetails', getUserDetails)

router.get('/getAllUser', getAllUser)
router.put('/updateUser/:id', updateUser)
// router.post('/test', (req,res)=>{
//     res.send('hello')
// })

export default router;