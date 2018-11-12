var linkCoolJSMenu = new Object;

//橫式選單
linkCoolJSMenu.createHorizontallyMenu = function(){
	if(MENU_ITEM_cj){
		var cj_menu = new COOLjsMenuPRO("cj_menu", MENU_ITEM_cj);
		cj_menu.initTop();
		
		// 將 cj_menu 限制在 header 內部，x,y座標的範圍是整個 header div 
		var header_div = dojo.byId("header");
		var cj_menu_r_div = dojo.byId('cj_menu_r');
		//動態版面不需要自動將橫式選單配置到版型
		if(header_div && cj_menu_r_div){
			header_div.appendChild(cj_menu_r);
			// 避免圖層高於 Dojo Dialog 預設的 z-index 為 950, 直式選單 z-index 為 880 所以橫式選單必需介於 880 ~ 950 之間 才不會互相干擾
			cj_menu_r_div.style.zIndex = 900;
		}else{
			dojo.byId("container").appendChild(cj_menu_r);
			// 避免圖層高於 Dojo Dialog 預設的 z-index 為 950, 直式選單 z-index 為 880 所以橫式選單必需介於 880 ~ 950 之間 才不會互相干擾
			cj_menu_r_div.style.zIndex = 900;		
		}
	}
}

linkCoolJSMenu.createHorizontallyMenu();
