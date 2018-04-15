using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public partial class Inc_safeCodePic : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
        if (Session["SafeCode"] == null)
        {
            ChangeCode();
        }
        if (Request.Form["action"] != null)
        {
             if (Convert.ToString(Request.Form["action"]) == "CheckCode") 
            {
                CheckCode();
            }
            else
            {
                ChangeCode();
                CreateBitMap(Session["SafeCode"].ToString());
            }
        }
        else 
        {
            ChangeCode();
            CreateBitMap(Session["SafeCode"].ToString());
        }
       
        
    }
    private void ChangeCode()
    {
        int codeLength = 4;
        string codestr = "";
        Random random = new Random();
        string[] Codes = "a,b,c,d,e,f,g,h,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,2,3,4,5,6,7,8,9".ToString().Split(',');
        for (int i = 0; i < codeLength; i++)
        {
           codestr = codestr + Codes[random.Next(Codes.Length)];
        }
        Session["SafeCode"] = codestr;
    }
    private void CheckCode() 
    {
        string Resp="false";
        if (Request.Form["safeCode"] != null) 
        {
            if (Convert.ToString(Request.Form["safeCode"]).ToLower() == Convert.ToString(Session["SafeCode"]).ToLower()) 
            {
                Resp = "true";
            }
        }
        Response.Write(Resp);
    }
    private void CreateBitMap(string CodeStr) 
    {
        int width = 160;
        int height = 48;
        int fontSize = 26;
        if (Request.QueryString["mode"] != null)
        {
            if (Convert.ToInt32(Request.QueryString["mode"]) == 1)
            {

            }
            else if (Convert.ToInt32(Request.QueryString["mode"]) == 2)
            {
                width = 80;
                height = 35;
                fontSize = 14;
            }
            else if (Convert.ToInt32(Request.QueryString["mode"]) == 3)
            {
                width = 60;
                height = 18;
                fontSize = 12;
            }
        }
        int font_Width = Convert.ToInt32( (width-6) / CodeStr.Length);
        if (font_Width > height) 
        {
            font_Width = height;
        }
        Font fontA = new Font("Arial", fontSize, FontStyle.Bold);
        Random random = new Random();
        Bitmap bitmap = new Bitmap(width, height);
        Graphics g = Graphics.FromImage(bitmap);
        MemoryStream ms = new MemoryStream();
        g.Clear(Color.White);
        g.DrawRectangle(new Pen(new SolidBrush(Color.Green)),0,0,width-1,height-1);
        for (int i = 0; i <CodeStr.Length; i++) 
        {
            if (i < 1)
            {
                g.DrawString(CodeStr.Substring(0, 1), fontA, new SolidBrush(Color.FromArgb(random.Next(105) + 50, random.Next(105) + 50, random.Next(105) + 50)), new RectangleF(3, random.Next(16), width, height));
            }
            else 
            {
                g.DrawString(CodeStr.Substring(i, 1), fontA, new SolidBrush(Color.FromArgb(random.Next(105) + 50, random.Next(105) + 50, random.Next(105) + 50)), new RectangleF((i * font_Width) + 3, random.Next(16), width, height));
            }
        }
        bitmap.Save(ms, ImageFormat.Gif);
        Response.BinaryWrite(ms.ToArray());
        ms.Dispose();
        g.Dispose();
    }
}
