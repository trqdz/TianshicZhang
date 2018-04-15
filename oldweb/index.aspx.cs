using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Security.Cryptography;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using DBUtility;
using Model;
using BLL;


public partial class index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        bindSMList();
        bindDSList();
        bindProductList();
    }


    public void bindSMList() 
    {
        string sqlcmd = "select top 8 * from SuanMing  order by sortId asc";
        List<SuanMing> dataList = new List<SuanMing>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, null))
        {
            while (dataRead.Read())
            {
                SuanMing dataInfo = new SuanMing();
                dataInfo.Id = Convert.ToInt32(dataRead["id"]);
                dataInfo.Name = Convert.ToString(dataRead["Name"]);
                dataInfo.ImgUrl = Convert.ToString(dataRead["ImgUrl"]);
                dataInfo.TargetUrl = Convert.ToString(dataRead["TargetUrl"]);
                dataList.Add(dataInfo);
            }
        }
        repSuanMing.DataSource = dataList;
        repSuanMing.DataBind();
    }


    public void bindDSList() 
    {
        string sqlcmd = "select top 3 * from [master] ";
        List<Master> dataList = new List<Master>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, null))
        {
            while (dataRead.Read())
            {
                Master dataInfo = new Master();
                dataInfo.Id = Convert.ToInt32(dataRead["id"]);
                dataInfo.Name = Convert.ToString(dataRead["Name"]);
                dataInfo.Title = Convert.ToString(dataRead["Title"]);
                dataInfo.ImgUrl = Convert.ToString(dataRead["ImgUrl"]);
                dataInfo.Description = BLL.Helper.getLeft(Convert.ToString(dataRead["Description"]), 50);
                dataList.Add(dataInfo);
            }
        }
        repDaShi.DataSource = dataList;
        repDaShi.DataBind();
    }

    private void bindProductList()
    {
        string sqlcmd = "select top 6 * from [product] ";
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