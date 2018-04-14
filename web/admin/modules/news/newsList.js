$(function(){




	//绑定投注列表
    function getPage(page)
    {
        $.ajax({
            url: "newsList.aspx?action=getnewslist",
            data: {
                page: page,
                categoryid:$("#selcategory").val()
            },
            method:"post",
            dataType:"json",
            success: function (data){
            	console.log(data);
            	
                if(data.ResultId==0){

                	var panelHtml="";
                	panelHtml=$("#tplDataHtml").html();
                    var listHtml="";
                    if(data.NewsList.length>0){
                        for(var i=0;i<data.NewsList.length;i++){
                            var itemHtml=$("#tplItemHtml").html();
                            var dataInfo=data.NewsList[i];
                            itemHtml=itemHtml.replace("{{Id}}",dataInfo.Id);
                            itemHtml=itemHtml.replace("{{Title}}",dataInfo.Title);
                            itemHtml=itemHtml.replace("{{Title}}",dataInfo.Title);
                            itemHtml=itemHtml.replace("{{Category}}","【"+dataInfo.CategoryInfo.CateName+"】");

                            itemHtml=itemHtml.replace("{{AddedDate}}",Fast.formatDate(dataInfo.AddedDate,"yyyy-MM-dd HH:mm:ss"));
                            itemHtml=itemHtml.replace("{{Hits}}",dataInfo.Hits);
                            listHtml+=itemHtml;
                        }
                        panelHtml=panelHtml.replace("{{listHtml}}",listHtml);
                    }
                    else{
                        panelHtml='<div style="color:red; padding:10px;">该分类下暂时没有内容</div>';
                    }
                   
                    $("#divDataPanel").html(panelHtml);
                    Fast.initPager($(".pager"),data.Page,getPage);
                }
                
                
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


        //删除新闻
        function deleteNews(newsId){
            $.ajax({
                url:"newsList.aspx",
                data:{
                    action:"deletenews",
                    delid:newsId
                },
                method:"post",
                datatype:"text",
                success:function(data){
                    window.top.Fast.ShowMsg({
                        title:"操作成功",
                        content:"<font color=red>新闻删除成功</font>",
                        timeout:3000
                    });
                    getPage();
                }
            })
        }



        //删除该新闻
        $("body").on("click",".btnDeleteOne",function(){
            var newsId=$(this).closest("tr").attr("data-newsId");
            window.top.Fast.Confirm({
                title:"操作提醒",
                content:"确定要删除该信息？将无法恢复！",
                success:function(){
                    deleteNews(newsId);
                }
            })
            
        })


        //编辑新闻
        $("body").on("click", ".btnEdit", function () {
            var newsId = $(this).closest("tr").attr("data-newsId");
            window.top.Fast.Dailog.Show({
                url: "modules/news/newsModify.aspx?id=" + newsId,
                title: "修改新闻",
                width: 700,
                height: 500,
                btnList: "btnSave,btnCancel",
                callBack: function () {
                    getPage();
                }

            });

        })


        //批量删除新闻
        $("#btnDelete").click(function(){
            var newsId="";
            $(".dataList .ckbselect:checked").each(function(){
                var dnewsId=$(this).closest("tr").attr("data-newsId");
                newsId+=dnewsId+",";
            })
            if(!!newsId){
                newsId=newsId.substring(0,newsId.length-1);
                var selectCount=newsId.split(",").length;
                window.top.Fast.Confirm({
                    title:"操作提醒",
                    content:"确定要删除选中的"+selectCount+"条信息？将无法恢复！",
                    success:function(){
                        deleteNews(newsId);
                    }
                })
            }
            else{
                 window.top.Fast.ShowMsg({
                    title:"操作失败",
                    content:"<font color=red>未勾选任何会员</font>",
                    timeout:3000
                });
            }
        })



        //添加新闻
        $("#btnAdd").click(function(){
            window.top.Fast.Dailog.Show({
                url: "modules/news/newsAdd.aspx",
                title:"添加新闻",
                width:700,
                height:500,
                btnList:"btnAdd,btnCancel",
                callBack:function(){
                    getPage();
                }

            });
        })




    }

	function main(){
		getPage();
       bindPageEvents();
	}

	main()



})