using System.Web.Mvc;

namespace Bravi.Minutes.Web.Controllers {
  public class HomeController : Controller {
    public ActionResult Index() {
      return View();
    }
  }
}