using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.UI.WebControls;

public partial class admin_fileUpload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    public string getFileName(string oldfileName)
    {
        int i = oldfileName.LastIndexOf('.');
        string fileAttribute = oldfileName.Substring(i).ToLower();
        return fileAttribute;
    }

    protected void Button1_Click(object sender, EventArgs e)
    {



        if (FileUpload1.HasFile)
        {
            string LastfileName;
            string newFilename;
            string newDirectoryStr = "/ckfinder/userfiles/images/";
            string objId;
            objId = Convert.ToString(Request.QueryString["objId"]);
            if (objId == null || objId == "")
            {
                LiteralScript.Text = "<script  type=\"text/javascript\" language=\"javascript\">alert('对不起，参数错误！');</script>";
            }

            LastfileName = FileUpload1.FileName;
            LastfileName = getFileName(LastfileName);
            if (LastfileName == ".jpg" || LastfileName == ".jpeg" || LastfileName == ".png" || LastfileName == ".gif")
            {
                newDirectoryStr += DateTime.Now.ToString("yyyy") + "" + DateTime.Now.ToString("MM") + "" + DateTime.Now.ToString("dd") + "/";
                DirectoryInfo dir = new DirectoryInfo(Server.MapPath(newDirectoryStr));
                if (!dir.Exists)
                {
                    dir.Create();
                }
                string newfileNameStr = DateTime.Now.ToString("HHmmss") + ((new Random()).Next(90000) + 9999).ToString();
                newFilename = newfileNameStr + LastfileName;
                FileUpload1.SaveAs(Server.MapPath(newDirectoryStr + newFilename));

                string scriptStr = "<script> window.parent.FileUploadCallBack('" + newDirectoryStr + newFilename + "');</script>";
                LiteralScript.Text = scriptStr;


            }
            else
            {
                string scriptString = "<script  type=\"text/javascript\" language=\"javascript\">alert('对不起，不允许上传该类文件！');</script>";
                LiteralScript.Text = scriptString;
            }
        }
        else
        {

            string scriptString = "<script  type=\"text/javascript\" language=\"javascript\">alert('请选择你要上传的文件！');</script>";
            LiteralScript.Text = scriptString;

        }


    }



    public ImageFormat getImageFormat(string lastName)
    {

        switch (lastName)
        {
            case ".jpg":
                return ImageFormat.Jpeg;
            case ".jpeg":
                return ImageFormat.Jpeg;
            case ".png":
                return ImageFormat.Png;
            case ".gif":
                return ImageFormat.Gif;
            default:
                return ImageFormat.Jpeg;
        }
    }
}