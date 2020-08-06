
export class TestDrawer {
	draw() {
		const body = $('body');
		body.append($.mustache(window.TemplateJS.main, {}));
	}

	loadData() {

		$.ajax({
			url: "/js/sms.js",
			success(data: any, textStatus: string, jqXHR: JQueryXHR): any {
				let container = $('#container');
				let items = JSON.parse(data);
				console.log(items);
				Object.keys(items).forEach(function (el, i) {
					container.append($.mustache(window.TemplateJS.item, { ID: items[i].ID, Name: items[i].Name, Img: items[i].Ico }));
				});
			}
		})
	}


	removeNotice() {
		const login = $("#login");
		login.empty();
		login.css({ display: "none" });
	}
	loadNotice(ID: any) {
		let jsObject: JSObjectType;
		let jsFile: JSObjectType[];
		const login = $("#login");
		$.get("/js/sms.js", function (data) {
			jsFile = JSON.parse(data);
		}).done(function () {
			jsObject = jsFile.find(findObject => findObject.ID == ID);
			if (jsObject != undefined) {
				login.append($.mustache(window.TemplateJS.loginWindow, {
					ParamsText: jsObject.ParamsText,
					Login: jsObject.Params[0].Name,
					Name: jsObject.Params[1].Name
				}));
			}
			else {
				login.append($.mustache(window.TemplateJS.loginWindow, {
					ParamsText: "Для того, чтобы найти API Key, необходимо зайти: Мой офис – настройки – API.",
					Login: "API Key",
					Name: "Имя отправителя"
				}));
			};


		});
		login.css({ display: "flex" });
	}
}

class JSObjectType {
	ID: any;
	Name: string;
	Ico: string;
	Params: [{
		Name: string;
		Type: number;
		Arc: string;
	},
		{
			Name: string;
			Type: number;
			Acr: string;
		}];
	ParamsText: string;
}