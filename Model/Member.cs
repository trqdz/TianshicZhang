using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Member
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private string _userName;

        public string UserName
        {
            get { return _userName; }
            set { _userName = value; }
        }
        private string _passWord;

        public string PassWord
        {
            get { return _passWord; }
            set { _passWord = value; }
        }
        private int _gender;
        /// <summary>
        /// 1.男2.女
        /// </summary>
        public int Gender
        {
            get { return _gender; }
            set { _gender = value; }
        }
        private string _CNName;

        public string CNName
        {
            get { return _CNName; }
            set { _CNName = value; }
        }
        private string _phone;

        public string Phone
        {
            get { return _phone; }
            set { _phone = value; }
        }
        private string _qq;

        public string Qq
        {
            get { return _qq; }
            set { _qq = value; }
        }
        private string _email;

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }
        private decimal _xfTotal;

        public decimal XfTotal
        {
            get { return _xfTotal; }
            set { _xfTotal = value; }
        }
        private DateTime _createTime;

        public DateTime CreateTime
        {
            get { return _createTime; }
            set { _createTime = value; }
        }

    }
}
