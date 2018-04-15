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



public partial class mine : BLL.UserBasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        string sqlcmd = "select * from member where id=@Id";
        SqlParameter param = new SqlParameter("@id", userId);
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {


                spnCNName.InnerText = Convert.ToString(dataRead["cnname"]);
                spnLastLoginTime.InnerText = Convert.ToDateTime(dataRead["lastLoginTime"]).ToString("yyyy-MM-dd HH:mm:ss");
                spnXFTotal.InnerText = Convert.ToDecimal(dataRead["xftotal"]).ToString("N");



            }
        }
    }



}