using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class ZiXun
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private string _title;

        public string Title
        {
            get { return _title; }
            set { _title = value; }
        }
        private string _description;

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }
        private decimal _price;

        public decimal Price
        {
            get { return _price; }
            set { _price = value; }
        }
    }
}
