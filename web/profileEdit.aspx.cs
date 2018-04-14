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

public partial class profileEdit : BLL.UserBasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            bindInfo();
        }
    }


    private void bindInfo() 
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        string sqlcmd = "select * from member where id=@Id";
        SqlParameter param = new SqlParameter("@id", userId);
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {

                spnUserName.InnerText = Convert.ToString(dataRead["userName"]);
                txtCNName.Value = Convert.ToString(dataRead["cnname"]);
                txtPhone.Value = Convert.ToString(dataRead["phone"]);
                txtQQ.Value = Convert.ToString(dataRead["qq"]);
                txtEmail.Value = Convert.ToString(dataRead["email"]);
                int gender = Convert.ToInt32(dataRead["gender"]);
                rdoGender.SelectedValue = Convert.ToString(gender);

            }
        }
    }



    protected void btnModify_Click(object sender, EventArgs e)
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        SqlParameter[] param = new SqlParameter[6];
        param[0] = new SqlParameter("@CNName", txtCNName.Value);
        param[1] = new SqlParameter("@gender", rdoGender.SelectedValue);
        param[2] = new SqlParameter("@phone", txtPhone.Value);
        param[3] = new SqlParameter("@qq", txtQQ.Value);
        param[4] = new SqlParameter("@email", txtEmail.Value);
        param[5] = new SqlParameter("@id", userId);
        string sqlcmd = "update member set CNName=@CNName,gender=@gender,phone=@phone,qq=@qq,email=@email where id=@id";
        SQLHelper.ExecuteNonQuery(CommandType.Text, sqlcmd, param);
        Response.Redirect("mine.aspx");
    }
}