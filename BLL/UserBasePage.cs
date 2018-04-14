using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public class UserBasePage : System.Web.UI.Page
    {
        public UserBasePage()
        {
            this.Load += new EventHandler(UserBasePage_Load);
        }
        protected void UserBasePage_Load(object sender, EventArgs e)
        {
            if (Session["userId"] == null)
            {
               //Session["adminId"] = "1";
                Response.Redirect("~/login.aspx");
            }

        }
    }
}
