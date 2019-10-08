// Transform data.js in our array
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

class InsertReplace extends Transform{
	constructor(){
		super();
		this.elem = document.querySelector('#first-line'); 
		this.resultHTML = '';
		this.item = this.transform();
	}
	// insert first three elem in DOM
	insertDom (){
		this.item.forEach((elem,index) => {
			if (index < 3){
				let itemTemplate = '<div class="col-sm-3 col-xs-6">\
										<img src="$url" alt="$name" class="img-thumbnail">\
										<div class="info-wrapper">\
											<div class="text-muted">$name</div>\
											<div class="text-muted">$params</div>\
											<div class="text-muted">$date</div>\
										</div>\
									</div>'; 

				this.resultHTML += itemTemplate
				.replace(/\$name/gi, elem.name)
				.replace("$url", elem.url)
				.replace("$params", elem.params)
				.replace("$date", elem.date);
			}
		});
		this.elem.innerHTML = this.resultHTML;
	}
}

let firstItem = new InsertReplace;
firstItem.insertDom();

class InsertInterpolite extends Transform{
	constructor(){
		super();
		this.elem = document.querySelector('#second-line');
		this.resultHTML = '';
		this.item = this.transform();
	}

	insertDom(){
		this.item.forEach((elem,index) => {
			if (2 < index && index < 6){
				this.resultHTML += `<div class="col-sm-3 col-xs-6">\
										<img src="${elem.url}" alt="${elem.name}" class="img-thumbnail">\
										<div class="info-wrapper">\
											<div class="text-muted">${elem.name}}</div>\
											<div class="text-muted">${elem.params}</div>\
											<div class="text-muted">${elem.date}</div>\
										</div>\
									</div>`; 
			}
		});
		console.log(this.resultHTML);
		this.elem.innerHTML = this.resultHTML;
	}
}

let secondItem = new InsertInterpolite;
secondItem.insertDom();

