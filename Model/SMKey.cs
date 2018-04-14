using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class SMKey
    {
        private int _id;

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        private int _smId;

        public int SmId
        {
            get { return _smId; }
            set { _smId = value; }
        }
        private int _sortId;

        public int SortId
        {
            get { return _sortId; }
            set { _sortId = value; }
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

        private int _isFree;
        /// <summary>
        /// 是否免费 0,免费 1.收费
        /// </summary>
        public int IsFree
        {
            get { return _isFree; }
            set { _isFree = value; }
        }
    }
}
