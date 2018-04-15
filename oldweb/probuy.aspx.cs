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

public partial class probuy : BLL.UserBasePage
{
    public static Model.Product proInfo = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            bindInfo();
        }
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
    protected void btnGoPay_Click(object sender, EventArgs e)
    {
        if (txtCNName.Text.Trim().Length < 2) 
        {
            Response.Write("<script>alert('请输入姓名')</script>");
            return;
        }
        else if (txtPhone.Text.Trim().Length < 10)
        {
            Response.Write("<script>alert('请输入手机号')</script>");
            return;
        }
        else if (txtAddress.Text.Trim().Length < 5)
        {
            Response.Write("<script>alert('请输入收货地址')</script>");
            return;
        }

        string description = txtCNName.Text + "," + txtPhone.Text + "," + txtAddress.Text;


        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        if (userId == 0)
        {
            Response.Redirect("index.aspx");
        }
        SqlParameter[] param = new SqlParameter[4];
        param[0] = new SqlParameter("@userId", userId);
        param[1] = new SqlParameter("@outId", proInfo.Id);  //商品id
        param[2] = new SqlParameter("@description", proInfo.Name + "|" + description);  //商品名称
        param[3] = new SqlParameter("@payTotal", proInfo.Price);  //商品价格
        string sqlcmd = "insert into [Order] (orderType,userId,outId,description,payState,createTime,payTotal) values(2,@userId,@outId,@description,0,getdate(),@payTotal); SELECT SCOPE_IDENTITY()";
        int orderId = Convert.ToInt32(SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd, param));
        Response.Redirect("myOrders.aspx");
    }
}