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

public partial class suanming : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        bindSMList();
    }

    public void bindSMList()
    {
        string sqlcmd = "select   * from SuanMing order by sortId asc ";
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
}