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


public partial class pwdReset : BLL.UserBasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnReset_Click(object sender, EventArgs e)
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        if (txtOldPwd.Text.Length < 6)
        {
            Response.Write("<script>alert('请输入6位以上旧密码')</script>");
            return;
        }
        else if (txtNewPwd.Text.Length < 6)
        {
            Response.Write("<script>alert('新密码长度不足6位')</script>");
            return;
        }
        else if (txtNewPwd.Text.Trim() != txtNewPwdConfirm.Text)
        {
            Response.Write("<script>alert('两次密码输入不一致')</script>");
            return;
        }
        string sqlcmd = "select * from member where id=@id and passWord=@passWord";
        SqlParameter[] param = new SqlParameter[2];
        param[0] = new SqlParameter("@id", userId);
        param[1] = new SqlParameter("@passWord", txtOldPwd.Text);
        using (SqlDataReader dataRead = DBUtility.SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {
                if (Convert.ToString(dataRead["passWord"]) ==txtOldPwd.Text)
                {
                   
                    SqlParameter[] param2 = new SqlParameter[2];
                    param2[0] = new SqlParameter("@passWord", txtNewPwd.Text);
                    param2[1] = new SqlParameter("@id", userId);
                    string sqlcmd2 = "update member set passWord=@passWord where id=@id";
                    DBUtility.SQLHelper.ExecuteNonQuery(CommandType.Text, sqlcmd2, param2);
                    Response.Write("<script>alert('密码修改成功');location.href='mine.aspx';</script>");
                    return;
                }
                else
                {
                    Response.Write("<script>alert('旧密码输入错误')</script>");
                    return;
                }
            }
            else
            {
                Response.Write("<script>alert('旧密码输入错误')</script>");
                return;
            }
        }
    }
}