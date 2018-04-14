using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
   public  class Option
    {
        private string _key;

        public string Key
        {
            get { return _key; }
            set { _key = value; }
        }
        private int _value;

        public int Value
        {
            get { return _value; }
            set { _value = value; }
        }
    }
}
