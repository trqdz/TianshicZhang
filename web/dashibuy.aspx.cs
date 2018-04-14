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


public partial class dashibuy : System.Web.UI.Page
{
    public static Model.Master masterInfo = null;
    public static Model.ZiXun zixunInfo = null;
    protected void Page_Load(object sender, EventArgs e)
    {

        bindDaShiInfo();
        bindZXInfo();

    }

    private void bindZXInfo() 
    {
        int id = 0;
        int.TryParse(Request["zxid"], out id);
        if (id == 0)
        {
            Response.Redirect("index.aspx");
        }
        SqlParameter param = new SqlParameter("@Id", id);
        string sqlcmd = "select * from zixun where Id=@Id";
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param))
        {
            if (dataRead.Read())
            {
                zixunInfo = new ZiXun();
                zixunInfo.Title = Convert.ToString(dataRead["Title"]);
                zixunInfo.Description = Convert.ToString(dataRead["Description"]);
                zixunInfo.Price = Convert.ToDecimal(dataRead["Price"]);
            }
            else
            {
                Response.Redirect("index.aspx");
            }
        }
    }



    private void bindDaShiInfo()
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
    protected void btnGoPay_Click(object sender, EventArgs e)
    {

        if (txtPhone.Text.Trim().Length < 2)
        {
            Response.Write("<script>alert('请输入联系方式')</script>");
            return;
        }

        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        if (userId == 0)
        {
            Response.Redirect("index.aspx");
        }
        SqlParameter[] param = new SqlParameter[4];
        param[0] = new SqlParameter("@userId", userId);
        param[1] = new SqlParameter("@outId", masterInfo.Id);  //商品id
        param[2] = new SqlParameter("@description", masterInfo.Name + "|" + zixunInfo.Title + "|" + txtPhone.Text.Trim());  //商品名称
        param[3] = new SqlParameter("@payTotal", zixunInfo.Price);  //商品价格
        string sqlcmd = "insert into [Order] (orderType,userId,outId,description,payState,createTime,payTotal) values(3,@userId,@outId,@description,0,getdate(),@payTotal); SELECT SCOPE_IDENTITY()";
        int orderId = Convert.ToInt32(SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd, param));
        Response.Redirect("myOrders.aspx");


    }
}