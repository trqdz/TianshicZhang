using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

namespace BLL
{
    public class Helper
    {
        public static string getLeft(string oldStr, int length) 
        {
            string result = oldStr;
            if (oldStr.Length > length) 
            {
                result = oldStr.Substring(0, length) + "..";
            }
            return result;
        }

        public static int getMD5Id(string str,int valCount) 
        {
            if (valCount == 0) 
            {
                return 0;
            }

            int result = 1;
            str = str.Trim();
            byte[] bts = Encoding.Default.GetBytes(str);    //tbPass为输入密码的文本框  
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] output = md5.ComputeHash(bts);
            string value = BitConverter.ToString(output).Replace("-", "");  //tbMd5pass为输出加密文本的文本框  
            result = Convert.ToInt32(value.Substring(4, 8), 16) % valCount;
            result = Math.Abs(result);
            return result+1;
        }



    }
}
