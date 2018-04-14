using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace DBUtility
{
    public class SQLHelper
    {
        public static readonly string ConnString = ConfigurationManager.ConnectionStrings["SQLConnstring"].ConnectionString;


        public static string paramsToString(params SqlParameter[] commandParameters)
        {
            string result = "";
            foreach (SqlParameter param in commandParameters)
            {
                result = result + "{" + param.ParameterName + ":" + param.SqlValue + "},";
            }
            if (result != "")
            {
                result = result.Substring(0, result.Length - 1);
            }
            result = "[" + result + "]";
            return result;
        }


        public static int ExecuteNonQuery(CommandType cmdType, string cmdText, params SqlParameter[] commandParameters)
        {
            int val = 0;
            SqlCommand cmd = new SqlCommand();
            try
            {
                using (SqlConnection conn = new SqlConnection(ConnString))
                {
                    PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);
                    val = cmd.ExecuteNonQuery();
                    cmd.Parameters.Clear();
                }
            }
            catch (Exception ex)
            {
               
            }
            return val;
        }

        public static SqlDataReader ExecuteReader(CommandType cmdType, string cmdText, params SqlParameter[] commandParameters)
        {
            SqlCommand cmd = new SqlCommand();
            SqlConnection conn = new SqlConnection(ConnString);
            try
            {
                PrepareCommand(cmd, conn, null, cmdType, cmdText, commandParameters);

                SqlDataReader rdr = cmd.ExecuteReader(CommandBehavior.CloseConnection);

                cmd.Parameters.Clear();
                return rdr;
            }
            catch (Exception ex)
            {
                
                conn.Close();
                throw ex;
            }
        }

        public static object ExecuteScalar(CommandType cmdType, string cmdText, params SqlParameter[] commandParameters)
        {
            SqlCommand cmd = new SqlCommand();
            object val = new object();
            try
            {
                using (SqlConnection connection = new SqlConnection(ConnString))
                {
                    PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
                    val = cmd.ExecuteScalar();
                    cmd.Parameters.Clear();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return val;
        }

        public static DataTable ExecuteTable(CommandType cmdType, string cmdText, params SqlParameter[] commandParameters)
        {
            SqlCommand cmd = new SqlCommand();
            using (SqlConnection connection = new SqlConnection(ConnString))
            {
                PrepareCommand(cmd, connection, null, cmdType, cmdText, commandParameters);
                DataSet dataSet = new DataSet();
                SqlDataAdapter dataApapter = new SqlDataAdapter(cmd);
                dataApapter.Fill(dataSet);
                return dataSet.Tables[0];
            }
        }

        private static void PrepareCommand(SqlCommand cmd, SqlConnection conn, SqlTransaction trans, CommandType cmdType, string cmdText, SqlParameter[] cmdParms)
        {

            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }
            cmd.Connection = conn;
            cmd.CommandText = cmdText;

            if (trans != null)
            {
                cmd.Transaction = trans;
            }
            cmd.CommandType = cmdType;

            if (cmdParms != null)
            {
                foreach (SqlParameter parm in cmdParms)
                {
                    cmd.Parameters.Add(parm);
                }
            }
        }

        //取得总页数
        public static int getPageCount(int recordCount, int pageSize)
        {
            int pageCount = 0;
            pageCount = recordCount / pageSize;
            if (recordCount % pageSize != 0)
            {
                pageCount = pageCount + 1;
            }
            return pageCount;
        }
    }
}
