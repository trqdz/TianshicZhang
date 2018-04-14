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

public partial class productInfo : System.Web.UI.Page
{

    public static Model.Product proInfo = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        bindInfo();
    }

    private void bindInfo()
    {
        int id = 0;
        int.TryParse(Request["id"], out id);
        if (id == 0)
        {
            Response.Redirect("index.aspx");
        }
        SqlParameter param = new SqlParameter("@Id", id);
        string sqlcmd = "select * from product where Id=@Id";
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {
                proInfo = new Product();
                proInfo.Id = Convert.ToInt32(dataRead["Id"]);
                proInfo.Name = Convert.ToString(dataRead["Name"]);
                proInfo.Title = Convert.ToString(dataRead["Title"]);
                proInfo.ImgUrl = Convert.ToString(dataRead["ImgUrl"]);
                proInfo.Price = Convert.ToDecimal(dataRead["Price"]);
                proInfo.MktPrice = Convert.ToDecimal(dataRead["MktPrice"]);
                proInfo.Description = Convert.ToString(dataRead["Description"]);
            }
            else
            {
                Response.Redirect("index.aspx");
            }
        }

    }
}