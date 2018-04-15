$(function(){




	//绑定投注列表
    function getPage(page)
    {
        $.ajax({
            url: "userList.aspx?action=getuserlist",
            data: {
                page: page,
                keyword:$("#txtkeyword").val()
            },
            method:"post",
            dataType:"json",
            success: function (data){
            	console.log(data);
            	
            	if (data.ApiCode == 0) {

                	var panelHtml="";
                	panelHtml=$("#tplDataHtml").html();
                    var listHtml="";
                    for(var i=0;i<data.UserList.length;i++){
                        var itemHtml=$("#tplItemHtml").html();
                        var dataInfo=data.UserList[i];
                        itemHtml = itemHtml.replace("{{UserId}}", dataInfo.MemberId);
                        itemHtml=itemHtml.replace("{{UserImage}}",!!dataInfo.UserImage?dataInfo.UserImage:"../../../images/avatar_1.jpg");
                        itemHtml=itemHtml.replace("{{FormatNO}}",dataInfo.FormatNO);
                        itemHtml=itemHtml.replace("{{UserName}}",dataInfo.UserName);
                        itemHtml=itemHtml.replace("{{NickName}}",dataInfo.NickName);
                        itemHtml=itemHtml.replace("{{Mobile}}",dataInfo.Mobile);
                        itemHtml=itemHtml.replace("{{QQ}}",dataInfo.QQ);
                        itemHtml=itemHtml.replace("{{RmbTotal}}",dataInfo.RmbTotal);
                        itemHtml = itemHtml.replace("{{PointTotal}}", dataInfo.Integral);
                        itemHtml = itemHtml.replace("{{Remark}}", dataInfo.Remark);
                        itemHtml=itemHtml.replace("{{LastLoginDate}}",Fast.formatDate(dataInfo.LastLoginDate,"yyyy-MM-dd HH:mm:ss"));



      
                        listHtml+=itemHtml;

                    }
                    panelHtml=panelHtml.replace("{{listHtml}}",listHtml);
                    $("#divDataPanel").html(panelHtml);
                }
                
                Fast.initPager($(".pager"),data.Page,getPage);
               // Util.initPager($("#divpager"),data.Page,getPage);
                
                

                
            }
        });
    }



    function bindPageEvents(){

        //搜索
        $("#btnSearch").click(function(){
            getPage();
        })

        //全选
        $("#btnSelectAll").click(function(){
            $(".ckbselect").prop("checked","checked")
        })

        //反选
        $("#btnToggleSelect").click(function(){
            $(".ckbselect").each(function(){
                var isChecked=!$(this).is(':checked');
                if(isChecked){
                    $(this).prop("checked",true)
                }
                else{
                    $(this).prop("checked",false)
                }
            }) 
        })



        //新增会员
        $("#btnAddMember").click(function(){
            // Fast.Dailog.show({
            //     url:"http://www.baidu.com/",
            //     title:"新增会员",
            // })
           // console.log( Fast.Dailog.show)
            window.top.Fast.Dailog.Show({
                url: "modules/member/userAdd.aspx",
                title:"新增会员",
                width:600,
                height:380,
                btnList:"btnSave,btnCancel",
                callBack:function(){
                    getPage();
                }

            });
        })


        //充值
        $("body").on("click",".btnRecharge",function(){
            var userId=$(this).closest("tr").attr("data-userId");

            window.top.Fast.Dailog.Show({
                url: "modules/member/recharge.aspx?id="+userId,
                title:"会员充值",
                width:400,
                height:250,
                btnList:"btnSave,btnCancel",
                callBack:function(){
                    getPage();
                }
            });
        })


        //修改密码
        $("body").on("click",".btnModifyPwd",function(){
            var userId=$(this).closest("tr").attr("data-userId");

            window.top.Fast.Dailog.Show({
                url: "modules/member/modifyPwd.aspx?id="+userId,
                title:"修改密码",
                width:400,
                height:190,
                btnList:"btnSave,btnCancel"
            });
        })

        //备注
        $("body").on("click", ".btnRemark", function () {
            var userId = $(this).closest("tr").attr("data-userId");

            window.top.Fast.Dailog.Show({
                url: "modules/member/setRemark.aspx?id=" + userId,
                title: "设置备注",
                width: 400,
                height: 190,
                btnList: "btnSave,btnCancel",
                callBack: function () {
                    getPage();
                }
            });
        })



        function deleteUsers(userId){
            window.top.Fast.Confirm({
                title:"操作提醒",
                content:"确定要删除该会员？将无法恢复！",
                success:function(){
                    $.ajax({
                        url:"userList.aspx",
                        data:{
                            action:"deleteuser",
                            delid:userId
                        },
                        method:"post",
                        datatype:"text",
                        success:function(data){
                            window.top.Fast.ShowMsg({
                                title:"操作成功",
                                content:"<font color=red>会员删除成功</font>",
                                timeout:3000
                            });
                            getPage();
                        }
                    })
                }
            })
        }

        //删除该会员
        $("body").on("click",".btnDeleteOne",function(){
            var userId=$(this).closest("tr").attr("data-userId");
            deleteUsers(userId);
            
        })


        //批量删除会员
        $("#btnDelete").click(function(){
            var userId="";
           // $('input:checkbox[name=ckbselect]:checked').
            $(".dataList .ckbselect:checked").each(function(){
                var dUserId=$(this).closest("tr").attr("data-userId");
                userId+=dUserId+",";
            })
            if(!!userId){
                userId=userId.substring(0,userId.length-1);
                deleteUsers(userId);
            }
            else{
                 window.top.Fast.ShowMsg({
                    title:"操作失败",
                    content:"<font color=red>未勾选任何会员</font>",
                    timeout:3000
                });
            }
        })


    }



	function main(){
		getPage();
        bindPageEvents();
	}

	main()



})