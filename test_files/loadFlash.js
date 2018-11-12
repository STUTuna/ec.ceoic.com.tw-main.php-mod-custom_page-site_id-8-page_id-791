/*設Header Flash初始值*/
function loadFlash(flashPath)
{

	if(flashPath!='nothing'){
		dojo.query("DIV#header DIV").forEach(function(node, index, arr){
			//header 內的DIV 僅允許顯示 flashDiv 與 menu  
			var display_type = "none";
			if(node.id == "flashDiv" || node.id=="cj_menu_r"){
				display_type = "block";
			}
			node.style.display = display_type;
		});

		//設定 flashDiv 的 flash 資料
		var flash_height = dojo.style("header","height");
		var flash_width = dojo.style("header","width");
		var so = new SWFObject(flashPath, "mymovie", flash_width, flash_height, "8", "");
		so.addParam("wmode", "opaque");
		so.write("flashDiv");
	}
}