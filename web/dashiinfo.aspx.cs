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

public partial class dashiinfo : System.Web.UI.Page
{
    public static Model.Master masterInfo = null;

    protected void Page_Load(object sender, EventArgs e)
    {

        bindInfo();
        bindZiXunList();

    }


    private void bindZiXunList() 
    {
        

        string sqlcmd = "select * from [zixun] ";
        List<ZiXun> dataList = new List<ZiXun>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, null))
        {
            while (dataRead.Read())
            {
                ZiXun dataInfo = new ZiXun();
                dataInfo.Id = Convert.ToInt32(dataRead["id"]);
                dataInfo.Title = Convert.ToString(dataRead["Title"]);
                dataInfo.Description = BLL.Helper.getLeft(Convert.ToString(dataRead["Description"]), 50);
                dataInfo.Price = Convert.ToDecimal(dataRead["Price"]);
                dataList.Add(dataInfo);
            }
        }
        repDataList.DataSource = dataList;
        repDataList.DataBind();
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
        string sqlcmd = "select * from master where Id=@Id";
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param)) 
        {
            if (dataRead.Read())
            {
                masterInfo = new Master();
                masterInfo.Id = Convert.ToInt32(dataRead["Id"]);
                masterInfo.Name = Convert.ToString(dataRead["Name"]);
                masterInfo.Title = Convert.ToString(dataRead["Title"]);
                masterInfo.ImgUrl = Convert.ToString(dataRead["ImgUrl"]);
                masterInfo.Description = Convert.ToString(dataRead["Description"]);

            }
            else 
            {
                Response.Redirect("index.aspx");
            }
        }

    }

}