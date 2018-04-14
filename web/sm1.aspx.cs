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



public partial class sm1 : System.Web.UI.Page
{
    public static Model.SuanMing smInfo = null;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            bindSMInfo();
            bindPage();
        }

        string action = Request["action"];

        if (action == "gosuanming")
        {
            goSuanming();
        }
        
    }

    private void goSuanming() 
    {
        int userId = 0;
        int.TryParse(Convert.ToString(Session["userId"]), out userId);
        string orderDesc = Request["CNName"] + " " + Request["gender"] + " " + Request["lifa"] + " " + Request["selYear"] + Request["selMonth"] + Request["selDay"] + Request["selHour"];
        int smId = Convert.ToInt32(Request["id"]);
        SqlParameter[] param = new SqlParameter[4];
        param[0] = new SqlParameter("@smId", smId);
        param[1] = new SqlParameter("@description", orderDesc);
        param[2] = new SqlParameter("@userId", userId);
        param[3] = new SqlParameter("@payTotal", smInfo.Price);
        string sqlcmd = "insert into [Order] (orderType,userId,outId,description,payState,createTime,payTotal) values(1,@userId,@smId,@description,0,getdate(),@payTotal); SELECT SCOPE_IDENTITY()";
        int orderId = Convert.ToInt32(SQLHelper.ExecuteScalar(CommandType.Text, sqlcmd, param));
        Session.Add("myOrderId", orderId);
        Response.Redirect("smShow.aspx?id=" + orderId);
    }



    private void bindSMInfo() 
    {
        int id = 0;
        int.TryParse(Request["id"], out id);
        if (id == 0)
        {
            Response.Redirect("index.aspx");
        }
        SqlParameter param = new SqlParameter("@Id", id);
        string sqlcmd = "select * from SuanMing where id=@Id";
        using (SqlDataReader dataRead = SQLHelper.ExecuteReader(CommandType.Text, sqlcmd, param)) 
        {
            if (dataRead.Read())
            {
                smInfo = new SuanMing();
                smInfo.Id = Convert.ToInt32(dataRead["Id"]);
                smInfo.Name = Convert.ToString(dataRead["Name"]);
                smInfo.Description = Convert.ToString(dataRead["Description"]);
                smInfo.BtnName = Convert.ToString(dataRead["BtnName"]);
                smInfo.Title = Convert.ToString(dataRead["Title"]);
                smInfo.Price = Convert.ToDecimal(dataRead["Price"]);
                smInfo.IsOrder = Convert.ToInt32(dataRead["IsOrder"]);
            }
            else 
            {
                Response.Redirect("index.aspx");
            }
        }



    }

    private void bindPage() 
    {
        bindYear();
        bindMonth();
        bindDay();
        bindHour();
    
    }

    private void bindYear()
    {
        List<Model.Option> yearList = new List<Model.Option>();
        int thisYear = DateTime.Now.Year;
        for (int i = 0; i < 100; i++)
        {
            Model.Option yearInfo = new Model.Option();
            yearInfo.Value = thisYear;
            yearInfo.Key = thisYear.ToString() + "年";
            thisYear--;
            yearList.Add(yearInfo);
        }
        selYear.DataSource = yearList;
        selYear.DataTextField = "Key";
        selYear.DataValueField = "Key";
        selYear.DataBind();
    }

    private void bindMonth() 
    {
        List<Model.Option> monthList = new List<Model.Option>();
        for (int i = 1; i <= 12; i++)
        {
            Model.Option monthInfo = new Model.Option();
            monthInfo.Value = i;
            monthInfo.Key = i.ToString() + "月";
            monthList.Add(monthInfo);
        }
        selMonth.DataSource = monthList;
        selMonth.DataTextField = "Key";
        selMonth.DataValueField = "Key";
        selMonth.DataBind();
    }

    private void bindDay()
    {
        List<Model.Option> dataList = new List<Model.Option>();
        for (int i = 1; i <= 31; i++)
        {
            Model.Option dataInfo = new Model.Option();
            dataInfo.Value = i;
            dataInfo.Key = i.ToString()+"日";
            dataList.Add(dataInfo);
        }

        selDay.DataSource = dataList;
        selDay.DataTextField = "Key";
        selDay.DataValueField = "Key";
        selDay.DataBind();
    }

    private void bindHour()
    {
        List<Model.Option> dataList = new List<Model.Option>();
        for (int i = 0; i <= 23; i++)
        {
            Model.Option dataInfo = new Model.Option();
            dataInfo.Value = i;
            dataInfo.Key = i.ToString() + "时";
            dataList.Add(dataInfo);
        }
        selHour.DataSource = dataList;
        selHour.DataTextField = "Key";
        selHour.DataValueField = "Key";
        selHour.DataBind();
    }





}