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

public partial class product : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        bindDataList();
    }

    private void bindDataList()
    {
        string sqlcmd = "select * from [product] ";
        List<Product> dataList = new List<Product>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, null))
        {
            while (dataRead.Read())
            {
                Product dataInfo = new Product();
                dataInfo.Id = Convert.ToInt32(dataRead["id"]);
                dataInfo.Name = Convert.ToString(dataRead["Name"]);
                dataInfo.Title = Convert.ToString(dataRead["Title"]);
                dataInfo.ImgUrl = Convert.ToString(dataRead["ImgUrl"]);
                dataList.Add(dataInfo);
            }
        }
        repProduct.DataSource = dataList;
        repProduct.DataBind();

    }
}