using System;
using System.Web.Optimization;

namespace Bravi.Minutes.Web
{
    public class DurandalBundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/knockout-{version}.js")
                .Include("~/Scripts/sammy-{version}.js")
                .Include("~/Scripts/bootstrap.min.js")
                .Include("~/Scripts/toastr.js")
                .Include("~/Scripts/wysihtml5-0.3.0_rc2.js")
                .Include("~/Scripts/bootstrap-wysihtml5-0.0.2.js")
                .Include("~/Scripts/knockout.custom.binding.handlers.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/Content/bootstrap-wysihtml5-0.0.2.css")
                .Include("~/Content/bootstrap.min.css")
                .Include("~/Content/bootstrap-responsive.min.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/app.css")
                .Include("~/Content/bootswatch.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}