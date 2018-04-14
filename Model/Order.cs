using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Order
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private int _userId;

        public int UserId
        {
            get { return _userId; }
            set { _userId = value; }
        }
        private int _orderType;

        /// <summary>
        /// 1.算命  2.购买商品  3.咨询大师
        /// </summary>
        public int OrderType
        {
            get { return _orderType; }
            set { _orderType = value; }
        }
        /// <summary>
        /// 算命类型id、
        /// </summary>
        private int _outId;

        public int OutId
        {
            get { return _outId; }
            set { _outId = value; }
        }
        private string _description;

        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }
        private DateTime _createTime;

        public DateTime CreateTime
        {
            get { return _createTime; }
            set { _createTime = value; }
        }

        private decimal _payTotal;

        public decimal PayTotal
        {
            get { return _payTotal; }
            set { _payTotal = value; }
        }

        private int _payState;
        /// <summary>
        /// 0未支付，1已支付
        /// </summary>
        public int PayState
        {
            get { return _payState; }
            set { _payState = value; }
        }
    }
}
