using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class footer : System.Web.UI.UserControl
{
    private string _tabName;

    public string TabName
    {
        get { return _tabName; }
        set { _tabName = value; }
    }


    protected void Page_Load(object sender, EventArgs e)
    {

    }
}