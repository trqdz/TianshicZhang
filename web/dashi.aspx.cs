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

public partial class dashi : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        bindDataList();
    }


   
    private  void bindDataList() 
    {
        string sqlcmd = "select * from [master] ";
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
                dataInfo.Description = BLL.Helper.getLeft(Convert.ToString(dataRead["Description"]),50);
                dataList.Add(dataInfo);
            }
        }
        repDaShi.DataSource = dataList;
        repDaShi.DataBind();

    }

}