const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const HomeController = require(`${userController}/v1/HomeController`)

  
/**
 * @api {get} /api/user/v1/pay pay
 * @apiVersion 1.0.0
 * @apiName pay
 * @apiDescription pay : if the online pay was unsuccessfull , there will be no "payURl".
 * @apiGroup user
 * @apiParam {String} orderId order id
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "پرداخت با موفقیت انجام شد",
 *      data: {
 *        payStatus: 100, 
 *        payURL: "https://www.zarinpal.com/pg/transaction/pay/585657"
 *      }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "پرداخت ناموفق", 
 *      data: { status: false }
 * }
 */
 router.post('/',HomeController.pay.bind(HomeController));



 /**
 * @api {get} /api/user/v1/pay validate pay
 * @apiVersion 1.0.0
 * @apiName validatePay
 * @apiDescription validate pay.send params as query.Status is "OK",or "NOK"
 * @apiGroup user
 * @apiParam {String} Authority pay authority
 * @apiParam {String} Status pay status
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success: true,
 *      message: "پرداخت با موفقیت انجام شد", 
 *      data: { status: true }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success: true,
 *      message: "پرداخت انجام نشد", 
 *      data: { status: false }
 * }
 */
  router.get('/',HomeController.validatePay.bind(HomeController));


module.exports = router;