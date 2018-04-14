using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Master
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private string _name;

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }
        private string _title;

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }
        private string _imgUrl;

        public string ImgUrl
        {
            get { return _imgUrl; }
            set { _imgUrl = value; }
        }
        private string _description;

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }
    }
}
