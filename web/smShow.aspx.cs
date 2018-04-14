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


public partial class smShow : System.Web.UI.Page
{

    public static Model.SuanMing smInfo = null;
    public static Model.Order orderInfo = null;


    protected void Page_Load(object sender, EventArgs e)
    {
        bindInfo();
    }



    /// <summary>
    /// 绑定算命各项数据
    /// </summary>
    /// <param name="smId"></param>
    private void bindSMKeyInfo(int smId) 
    {
        SqlParameter param = new SqlParameter("@smId", smId);
        string sqlcmd = "select * from SMKey where smId=@smId order by sortId asc ";
        List<Model.SMKey> dataList = new List<SMKey>();
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param)) 
        {
            while (dataRead.Read()) 
            {
                Model.SMKey dataInfo = new SMKey();
                dataInfo.Id = Convert.ToInt32(dataRead["Id"]);
                dataInfo.SmId = Convert.ToInt32(dataRead["SmId"]);
                dataInfo.Title = Convert.ToString(dataRead["Title"]);
                dataInfo.Description = Convert.ToString(dataRead["Description"]);
                dataInfo.IsFree = Convert.ToInt32(dataRead["IsFree"]);
                dataList.Add(dataInfo);
            }
        }
        repKeyList.DataSource = dataList;
        repKeyList.DataBind();
    }

    /// <summary>
    /// 绑定算命基础信息
    /// </summary>
    /// <param name="smId"></param>
    private void bindSMInfo(int smId) 
    {

        string sqlcmd = "select * from SuanMing where id=" + smId;
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, null)) 
        {
            if (dataRead.Read()) 
            {
                smInfo = new SuanMing();
                smInfo.Name = Convert.ToString(dataRead["Name"]);
                smInfo.Price = Convert.ToDecimal(dataRead["price"]);
                smInfo.IsOrder = Convert.ToInt32(dataRead["IsOrder"]);
            }
        }
    }


    public static string bindSMValue(int keyId,int isFree) 
    {
        int valCount = Convert.ToInt32(SQLHelper.ExecuteScalar(CommandType.Text, "select count(id) from SMValue where keyId=" + keyId, null));
        int md5Id = BLL.Helper.getMD5Id(orderInfo.Description+keyId, valCount);
       
        //return valCount.ToString()+"|"+ md5Id.ToString();

        string result = "" ;
        if (isFree ==1&&orderInfo.PayState==0)
        {
            result = "<font color=\"red\">此信息需要付款后方可查看</font>";
            
        }
        else 
        {
            SqlParameter[] param = new SqlParameter[2];
            param[0] = new SqlParameter("@keyId", keyId);
            param[1] = new SqlParameter("@md5Id", md5Id);
            string sqlcmd = "select smContent from SMValue where keyId=@keyId and md5Id=@md5Id ";
            result = Convert.ToString(SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd, param));
        }
        if (result != "") 
        {
            result = "<div  class=\"desc2\">" + result + "</div>" ;
        }
        return result;
    }



    private void bindInfo() 
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);

        int myOrderId = 0;
        int.TryParse(Convert.ToString(Session["myOrderId"]), out myOrderId);

        int orderId = 0;
        int.TryParse(Request["id"], out orderId);
        SqlParameter param = new SqlParameter("@Id", orderId);
        string sqlcmd = "select * from [Order] where orderType=1 and id=@Id";
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param)) 
        {
            if (dataRead.Read()) 
            {
                orderInfo = new Order();
                orderInfo.Id = Convert.ToInt32(dataRead["Id"]);
                orderInfo.UserId = Convert.ToInt32(dataRead["UserId"]);
                orderInfo.OutId = Convert.ToInt32(dataRead["OutId"]);   //算命类型ID
                orderInfo.Description = Convert.ToString(dataRead["Description"]);
                orderInfo.PayState = Convert.ToInt32(dataRead["PayState"]);
            }
        }
        if (orderInfo == null) 
        {
            Response.Redirect("index.aspx");
            return;
        }

        //不允许查看他人订单
        if (userId != orderInfo.UserId || myOrderId != orderId) 
        {
            Response.Redirect("index.aspx");
            return;
        }



        txtOrderDesc.InnerHtml = orderInfo.Description;
        bindSMInfo(orderInfo.OutId);
        bindSMKeyInfo(orderInfo.OutId);
        
    }


}