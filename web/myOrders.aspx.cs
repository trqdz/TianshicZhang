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


public partial class myOrders : BLL.UserBasePage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        bindDataList();
    }


    public static string getOrderType(int orderType) 
    {
        string result = "";
        if (orderType == 1) 
        {
            result = "精准算命";
        }
        else if (orderType == 2)
        {
            result = "旺运改命";
        }
        else if (orderType == 3)
        {
            result = "咨询大师";
        }

        return result;
    }
    public static string getPayState(int payState)
    {
        string result = "";
        if (payState == 0)
        {
            result = "<span style=\"color: #333;\">未支付</span>";
        }
        else if (payState ==1)
        {
            result = "<span style=\"color: #00bf16;\">已支付</span>";
        }

        return result;
    }


    private void bindDataList()
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        SqlParameter param = new SqlParameter("@userId", userId);
        string sqlcmd = "select * from [Order] where userId=@userId ";
        List<Model.Order> dataList = new List<Model.Order>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            while (dataRead.Read())
            {
                Model.Order dataInfo = new Model.Order();
                dataInfo.Id = Convert.ToInt32(dataRead["id"]);
                dataInfo.UserId = Convert.ToInt32(dataRead["UserId"]);
                dataInfo.OrderType = Convert.ToInt32(dataRead["OrderType"]);
                dataInfo.OutId = Convert.ToInt32(dataRead["OutId"]);
                dataInfo.Description = Convert.ToString(dataRead["Description"]);
                dataInfo.CreateTime = Convert.ToDateTime(dataRead["CreateTime"]);
                dataInfo.PayTotal = Convert.ToDecimal(dataRead["PayTotal"]);
                dataInfo.PayState = Convert.ToInt32(dataRead["PayState"]);

                dataList.Add(dataInfo);
            }
        }
        repDatalist.DataSource = dataList;
        repDatalist.DataBind();

    }
}