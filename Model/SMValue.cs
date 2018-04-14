using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class SMValue
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private int _keyId;

        public int KeyId
        {
            get { return _keyId; }
            set { _keyId = value; }
        }
        private int _md5Id;

        public int Md5Id
        {
            get { return _md5Id; }
            set { _md5Id = value; }
        }
        private string _smContent;

        public string SmContent
        {
            get { return _smContent; }
            set { _smContent = value; }
        }

    }
}
