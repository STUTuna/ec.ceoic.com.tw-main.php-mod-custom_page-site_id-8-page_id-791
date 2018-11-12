dojo.require('dojox.layout.ContentPane');

function get_mod_ad_content(announce_key, url)
{
	var  div_id = "div_mod_ad_manager_"+announce_key;
	dojo.xhrGet({
		url: url,
		content: {
			'layout_pos_id':announce_key
		},
		load: function(data, args) {
			dijit.byId(div_id).attr("content", data);
		},
		error: function(error_response, args) {
			console.log("ad_manager: get_mod_ad_content error: "+ error_response);
		}
	});
}

function jump2url(link,linktype) {
	//alert(linktype);
	jumpUrl = link;
	jumpTarget = linktype;
	if (jumpUrl != '' && jumpTarget!='0') {

		if (jumpTarget != '')
			window.open(jumpUrl, jumpTarget);
		else
			location.href = jumpUrl;
	}
}

function executeMarquee(DivName,ScrollStyle,ScrollHeight, Speed){
	console.log("executeMarquee " + ScrollStyle);
	var Height = parseInt(ScrollHeight);
	var Width = parseInt(dojo.byId(DivName).offsetWidth);
	var marquee = new Marquee(DivName,ScrollStyle,1,Width,Height,50);
	//此為捲動速度，必須為數字
	marquee.Step = parseInt(Speed);
	marquee.Start();
}

//顯示廣告的詳細資料
function show_ad_detail(ad_id){
    var url = dojo.byId("detail_link").value;
    window.location = url + "&ad_id=" + ad_id;
}