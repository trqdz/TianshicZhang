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


public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnReg_Click(object sender, EventArgs e)
    {
        Response.Redirect("reg.aspx");
    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        string sqlcmd1 = "select * from member where userName=@userName";
        SqlParameter param = new SqlParameter("@userName", txtUserName.Text);
        int userId = 0;
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd1, param))
        {
            if (dataRead.Read())
            {
                if (Convert.ToString(dataRead["userName"]) != txtUserName.Text)
                {
                    Response.Write("<script>alert('用户名或密码错误')</script>");
                    return;

                }
                else if (Convert.ToString(dataRead["password"]) != txtPwd.Text)
                {
                    Response.Write("<script>alert('用户名或密码错误')</script>");
                    return;
                }
                else 
                {
                    userId = Convert.ToInt32(dataRead["id"]);
                }
            }
            else
            {
                Response.Write("<script>alert('用户名或密码错误')</script>");
                return;
            }
        }

        //更新登录时间
        if (userId != 0)
        {
            SqlParameter param2 = new SqlParameter("@id", userId);
            string sqlcmd2 = "update member set LastLoginTime=getdate() where id=@id ";
            SQLHelper.ExecuteNonQuery(CommandType.Text, sqlcmd2, param2);
            Session.Add("userId", userId);
            Response.Redirect("mine.aspx");

        }
    }
}