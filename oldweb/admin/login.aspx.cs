using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using BLL;

public partial class admin_login :BLL.BasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
       

    }

    protected void btnLogin_Click(object sender, EventArgs e)
    {
        
        string username = txtUserName.Text;
        string userpwd = txtPwd.Text;
        string safecode = txtSafeCode.Text;
        if (Convert.ToString( Session["SafeCode"] ).ToLower()!= safecode.ToLower())
        {
            lblErrpanel.InnerHtml = "验证码错误";
           
            return;
        }
        SqlParameter[] param = new SqlParameter[2];
        param[0] = new SqlParameter("@username", username);
        param[1] = new SqlParameter("@userpwd", userpwd);
        string sqlcmd = "select * from admin where username=@username and userpwd=@userpwd";
        int userId = 0;
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {
                if (Convert.ToString(dataRead["username"]) == username && Convert.ToString(dataRead["userpwd"]) == userpwd)
                {
                    userId = Convert.ToInt32(dataRead["id"]);
                }
            }
        }
        if (userId == 0)
        {
            lblErrpanel.InnerHtml = "用户名或密码错误";
            return;
        }


        SqlParameter[] param2 = new SqlParameter[2];
        param2[0] = new SqlParameter("@lastIP", Request.ServerVariables["REMOTE_ADDR"]);
        param2[1] = new SqlParameter("@id", userId);
        string sqlcmd2 = "update admin set lastIP=@lastIP,lastDate=getdate() where id=@id";
        SQLHelper.ExecuteNonQuery(CommandType.Text, sqlcmd2, param2);
        Session.Add("adminId", userId);
        Response.Redirect("index.aspx");

    }
}