class Transform {

	getArr(node){
		let newArr = [];
		node.forEach(elem => {
				newArr.push({
					url : elem.url,
					name : elem.name,
					params : elem.params,
					date : elem.date
				});
		});
		return newArr;
	}

	getName(elem){
		return elem.name[0] + elem.name.substr(1).toLowerCase();
	}

	getDate(elem){
		let date = elem.date;
		let tmpDate = new Date(date),
			year  = tmpDate.getFullYear(),
			mounth = tmpDate.getMonth() + 1,
			day = tmpDate.getDate(),
			hours = tmpDate.getHours(),
			minuts = tmpDate.getMinutes();
		return `${year}/${mounth}/${day} ${hours}:${minuts}`;
	}


	editArr(arr){
		return arr.map((elem) => {
			return {
				url : `http://${elem.url}`,
				name : this.getName(elem),
				params : `${elem.params.status}=>${elem.params.progress}`,
				date : this.getDate(elem)
			};
		});
	}

	transform(){
		let newArr = this.getArr(data);
		let result = this.editArr(newArr);
		return result;
	}
}

let editArr = new Transform;
let newData = editArr.transform();
console.log(newData);
/* 
function print(node){
    return console.log(node);
}

function getArr(node){
    let newArr = [];
    node.forEach(elem => {
            newArr.push({
                url : elem.url,
                name : elem.name,
                params : elem.params,
                date : elem.date
            });
    });
    return newArr;
}

function getName(elem){
    return elem.name[0] + elem.name.substr(1).toLowerCase();
}

function getDate(elem){
    let date = elem.date;
    let tmpDate = new Date(date),
        year  = tmpDate.getFullYear(),
        mounth = tmpDate.getMonth() + 1,
        day = tmpDate.getDate(),
        hours = tmpDate.getHours(),
        minuts = tmpDate.getMinutes();
    return `${year}/${mounth}/${day} ${hours}:${minuts}`;
}


function editArr(arr){
    return arr.map((elem) => {
        return {
            url : `http://${elem.url}`,
            name : getName(elem),
            params : `${elem.params.status}=>${elem.params.progress}`,
            date : getDate(elem)
        };
    });
}
function transform(){
    let newArr = getArr(data);
    let result = editArr(newArr);
    print(result);
}
transform(); */


//-----------------------------------------------------




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