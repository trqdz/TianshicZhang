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


public partial class reg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        

        //step1:判断会员名是否有效
        if (txtUserName.Text.Trim().Length != txtUserName.Text.Length || txtUserName.Text.Length < 4 || txtUserName.Text.Length > 16)
        {
            Response.Write("<script>alert('用户帐号输入不符合规则')</script>");
            return;
        }

        //step2:判断用户名是否被注册
        string sqlcmd1 = "select id from Member where userName=@userName";
        SqlParameter param1 = new SqlParameter("@userName", txtUserName.Text);
        object regName = SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd1, param1);
        if (regName != null)
        {
            Response.Write("<script>alert('该账户已存在')</script>");
            return;
        }
        

        //step3:判断密码是否含有空格
        if (txtPwd.Text.Trim().Length != txtPwd.Text.Length || txtPwd.Text.Length < 6 || txtPwd.Text.Length > 12)
        {
            Response.Write("<script>alert('密码必须是英文或者数字')</script>");
            return;
        }

        //step4:判断两次密码输入是否一致
        if (txtPwd.Text != txtPwdConfirm.Text)
        {
            Response.Write("<script>alert('两次密码输入不一致')</script>");
            return;
        }

        //step5:注册会员
        string sqlcmd2 = @"insert into member (userName,password,createTime,xfTotal,LastLoginTime,CNName) values 
                                (@userName,@password,getdate(),0,getdate(),'会员');SELECT SCOPE_IDENTITY()";
        SqlParameter[] param2 = new SqlParameter[2];
        param2[0] = new SqlParameter("@userName", txtUserName.Text);
        param2[1] = new SqlParameter("@password", txtPwd.Text);
        int userId = Convert.ToInt32(SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd2, param2));
        Session.Add("userId", userId);
        Response.Redirect("mine.aspx");

    }
}