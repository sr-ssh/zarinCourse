const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = "v1_";
const ZarinpalCheckout = require("zarinpal-checkout");
const zarinpal = ZarinpalCheckout.create(
  "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  true
); //if true it brings sandbox, if false it brings true zarinpal page

module.exports = new (class HomeController extends Controller {
  async index(req, res) {
    return res.json({ success: true, message: "Home v1" });
  }

  async pay(req, res) {
    try {

      let zarinRes = await zarinpal.PaymentRequest({
        Amount: req.body.amount, // In Tomans
        CallbackURL: "http://localhost:6000/api/user/v1/",
        Description: "از خرید شما ممنونیم",
      });
      if (zarinRes.status != 100)
        return res.json({
          success: true,
          message: "پرداخت ناموفق",
          data: { status: zarinRes.status },
        });

      let params = {
        amount: req.body.amount,
        authority: zarinRes.authority,
      };
      await this.model.Pay.create(params);

      return res.json({
        success: true,
        message: "پرداخت با موفقیت انجام شد",
        data: { status: zarinRes.status, payURL: zarinRes.url },
      });
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("payOrder")
        .inputParams(req.body)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }

  async validatePay(req, res) {
    try {
      let filter = { authority: req.query.Authority };
      let pay = await this.model.Pay.findOne(filter);
      if (!pay)
        return res.json({
          success: true,
          message: "پرداخت موجود نیست",
          data: { status: false },
        });

      let zarinRes = await zarinpal.PaymentVerification({
        Amount: pay.amount, // In Tomans
        Authority: req.query.Authority,
      });


      if (zarinRes.status === 100 || zarinRes.status === 101) {
        pay.paid = true;
        await pay.save();

        // return res.redirect("http://www.happypizza.ir/pay/success");
        return res.json({
            success: true,
            message: "پرداخت با موفقیت انجام شد",
          });
      }

      return res.json({
        success: true,
        message: "پرداخت انجام نشد"
      });

      // return res.redirect("http://www.happypizza.ir/pay/fail");
    } catch (err) {
      let handelError = new this.transforms.ErrorTransform(err)
        .parent(this.controllerTag)
        .class(TAG)
        .method("validatePay")
        .inputParams(req.params)
        .call();

      if (!res.headersSent) return res.status(500).json(handelError);
    }
  }
})();
