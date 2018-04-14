using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class SuanMing
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
        private string _btnName;

        public string BtnName
        {
            get { return _btnName; }
            set { _btnName = value; }
        }

        private string _targetUrl;

        public string TargetUrl
        {
            get { return _targetUrl; }
            set { _targetUrl = value; }
        }

        private int _sortId;

        public int SortId
        {
            get { return _sortId; }
            set { _sortId = value; }
        }

        private int _isOrder;
        /// <summary>
        /// 是否生成订单 0.不生成 1.生成
        /// </summary>
        public int IsOrder
        {
            get { return _isOrder; }
            set { _isOrder = value; }
        }

        private decimal _price;

        public decimal Price
        {
            get { return _price; }
            set { _price = value; }
        }

    }
}
