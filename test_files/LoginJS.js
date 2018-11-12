dojo.require("dijit.form.Button");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.ValidationTextBox");
dojo.require("dojox.widget.Standby");
/**
 * 登入物件
 * @returns {undefined}
 */
var LoginJS = function() {
	var loginJs = this;
	/**
	 * 登入驗證
	 * @returns {Boolean}
	 */
	loginJs.validLogin = function() {
		if (dijit.byId('captcha_code') != undefined) {
			if (!dijit.byId('captcha_code').isValid()) {
				dijit.byId('captcha_code').focus();
				return false;
			}
		}
		var user_id = dojo.byId('user_id').value;
		var user_passwd = dojo.byId('user_passwd').value;
		if (user_id == "") {
			alert(dojo.byId("T_input_account").value);
			return false;
		} else if (user_passwd == "") {
			alert(dojo.byId("T_input_password").value);
			return false;
		}
		loginJs.userLogin();
		return false;
	}
	/**
	 * 登入
	 * @returns {undefined}
	 */
	loginJs.userLogin = function() {
		var lead_admin = dojo.byId("lead_admin").value;
		var admin_link = dojo.byId("admin_link").value;
		var logined_link = dojo.byId("logined_link").value;
		var login_link = dojo.byId("login_link").value;

		var xhrArgs = {
			url: login_link,
			form: "login_form",
			handleAs: "json",
			timeout: 60000,
			load: function(data, args) {
				if (data.is_logined == true) {
					var queryParams = dojo.queryToObject(window.location.search.slice(1));
					if (queryParams.goto) {
						location.href = queryParams.goto;
						return;
					}
					if (lead_admin == "MU")
						dijit.byId("loginDiv").setHref(logined_link);
					else if (lead_admin == "AT")
						location.href = admin_link;
					return;
				}
				if (dojo.byId('captcha_img') != undefined) {
					loginJs.refreshCaptcha();
				}
				alert(data.error_message);
			},
			error: function(error, args) {
				console.log(error);
				alert("Error, there is something on error.");
			}
		}
		dojo.xhrPost(xhrArgs);
	}
	/**
	 * 更新驗證碼
	 * @returns {undefined}
	 */
	loginJs.refreshCaptcha = function() {
		dojo.byId('captcha_img').src += "&" + Math.random();
	}
	/**
	 * 忘記密碼驗證
	 * @returns {Boolean}
	 */
	loginJs.checkAccount = function() {
		if (dojo.byId('user_account').value == '') {
			alert(dojo.byId("T_input_account").value);
			return false;
		} else if (dojo.byId('user_email').value == '') {
			alert(dojo.byId("T_input_mail").value);
			return false;
		}

		var xhrArgs = {
			url: dojo.byId("send_recover_mail_link").value,
			content: {
				user_account: dojo.byId("user_account").value,
				user_email: dojo.byId("user_email").value
			},
			handleAs: "json",
			load: function(data, args) {
				dijit.byId("forgetpwDivStandby").hide();
				alert(data.msg);
				if (data.success)
					dijit.byId('forgetpwDiv').hide();
			},
			error: function(error, args) {
				alert("發生不明錯誤: " + error);
			}
		}
		dijit.byId("forgetpwDivStandby").show();
		dojo.xhrPost(xhrArgs);

	}
}
var loginJS = new LoginJS();