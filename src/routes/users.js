import { Router } from 'express'
const router = Router()

export default router.get('/', function(req, res, next) {
	res.send('respond with a resource')
})
