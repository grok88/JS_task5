
var item = {
	url: "http://desktopwallpapers.org.ua/mini/201507/40069.jpg",
	name: "CHEVROLET",
	params : "true=>80",
	description : "be conveyed to ...",
	date : "2015/01/25 14:15"
};


var first = document.querySelector('#first-line');
var resultHTML = "";
var itemTemplate = '<div class="col-sm-3 col-xs-6">\
				<img src="$url" alt="$name" class="img-thumbnail">\
				<div class="info-wrapper">\
					<div class="text-muted">$name</div>\
					<div class="text-muted">$description</div>\
                    <div class="text-muted">$params</div>\
					<div class="text-muted">$date</div>\
				</div>\
			</div>';

resultHTML = itemTemplate
	.replace(/\$name/gi, item.name)
	.replace("$url", item.url)
    .replace("$params", item.params)
	.replace("$description", item.description)
	.replace("$date", item.date);
			
first.innerHTML = resultHTML;		
			

var second = document.querySelector('#second-line');
var resultHTML = "";
var itemTemplate = `<div class="col-sm-3 col-xs-6">\
				<img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
				<div class="info-wrapper">\
					<div class="text-muted">${item.name}</div>\
					<div class="text-muted">${item.description}</div>\
                    <div class="text-muted">${item.params}</div>\
					<div class="text-muted">${item.date}</div>\
				</div>\
			</div>`;
/*
resultHTML = itemTemplate
	.replace("$number", item.id)
	.replace(/\$name/gi, item.name)
	.replace("$url", item.url)
    .replace("$params", item.params)
	.replace("$description", item.description)
	.replace("$date", item.date);
*/			
second.innerHTML = itemTemplate;		