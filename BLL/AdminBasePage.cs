using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public class AdminBasePage : System.Web.UI.Page
    {
        public AdminBasePage() 
        {
            this.Load += new EventHandler(AdminBasePage_Load); ;
        }

        protected void AdminBasePage_Load(object sender, EventArgs e)
        {
            if (Session["adminId"] == null)
            {
                //Session["adminId"] = "1";
                Response.Redirect("login.aspx");
            }

        }

        public string GetStringParam(string param)
        {
            return Request[param] != null ? Convert.ToString(Request[param]) : "";
        }
        public int GetIntParam(string param)
        {
            return (Request[param] != null && Request[param] != string.Empty) ? Convert.ToInt32(Request[param]) : 0;
        }
        public DateTime GetDateTimeParam(string param)
        {
            DateTime result = Convert.ToDateTime("1900-1-1");
            if (Request[param] != "" && Request[param] != null)
            {
                result = Convert.ToDateTime(Request[param]);
            }
            return result;
        }

        public bool GetBooleanParam(string param)
        {
            bool result = false;
            if (Request[param] != string.Empty && Request[param] != null)
            {
                result = Convert.ToBoolean(Request[param]);
            }
            return result;
        }
    }
}
