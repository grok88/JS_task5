
(function(){

    // Transform data.js in our array
    class Transform {
        constructor(count){
            this.count = +count;
            this.item = this.transform();
        }

        defineCount(res){
            switch (this.count) {
                case 1:
                    this.count = 3; 
                    break;
                case 2:
                    this.count = 6; 
                    break;
                case 0:
                    this.count = res.length; 
                    break;
                default:
                    alert('Horrible error');
                    break;
            }
        }
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
            this.defineCount(result);
            return result;
        }
    }

    class InsertReplace extends Transform{
        constructor(count){
            super(count);
            this.elem = document.querySelector('#first-line'); 
            this.resultHTML = '';
            // this.item = this.transform();
        }
        // insert first three elem in DOM
        insertDom (){
            this.item.forEach((elem,index) => {
                if (index < this.count){
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

    class InsertInterpolite extends Transform{
        constructor(count){
            super(count);
            this.elem = document.querySelector('#second-line');
            this.resultHTML = '';
        }

        insertDom(){
            this.item.forEach((elem,index) => {
                if (index < this.count){
                    this.resultHTML += `<div class="col-sm-3 col-xs-6">\
                                            <img src="${elem.url}" alt="${elem.name}" class="img-thumbnail">\
                                            <div class="info-wrapper">\
                                                <div class="text-muted">${elem.name}</div>\
                                                <div class="text-muted">${elem.params}</div>\
                                                <div class="text-muted">${elem.date}</div>\
                                            </div>\
                                        </div>`; 
                }
            });
            this.elem.innerHTML = this.resultHTML;
        }
    }

    // Вставка с помощью DOM
    class InsertElement extends Transform{
        constructor(count){
            super(count);
            this.elem = document.querySelector('#third-line');
        }

        insertDom(){
            this.item.forEach((elem,index) => {
                if (index < this.count){
                    // create Div
                    let div = document.createElement('div');
                    div.className = 'col-sm-3 col-xs-6';
                    // create img
                    let img = document.createElement('img');
                    img.className = 'img-thumbnail';
                    img.src = `${elem.url}`;
                    img.alt = `${elem.name}`;
                    // append img in div
                    div.append(img);
                    // create nested div
                    let nestedDiv = document.createElement('div');
                    nestedDiv.className = 'info-wrapper';
                    nestedDiv.innerHTML = `<div class="text-muted">${elem.name}</div>\
                                            <div class="text-muted">${elem.params}</div>\
                                            <div class="text-muted">${elem.date}</div>`;
                    div.append(nestedDiv);
                    // append div
                    this.elem.append(div);
                }
            });
        }
    }
    
    let btn = document.getElementById("play");

    function init() {
        let value = document.querySelector('#type-selector').value;
        let count = document.querySelector('#line-selector').value; 

        if(value == 1){
            let firstItem = new InsertReplace(count);
            firstItem.insertDom();
            // один из примеров как прятать блоки
            document.querySelector('.first-group').classList.add("show");
            document.querySelector('.second-group').classList.remove("show");
            document.querySelector('.third-group').classList.remove("show");
        } else if (value == 2){
            let secondItem = new InsertInterpolite(count);
            secondItem.insertDom();
            // один из примеров как прятать блоки
            document.querySelector('.first-group').classList.remove("show");
            document.querySelector('.second-group').classList.add("show");
            document.querySelector('.third-group').classList.remove("show");

        } else if (value == 3){
            let thirdItem = new InsertElement(count);
            thirdItem.insertDom();
            document.querySelector('.first-group').classList.remove("show");
            document.querySelector('.second-group').classList.remove("show");
            document.querySelector('.third-group').classList.add("show");
        } else {
            alert('Выберите метод вставки');
        }
        
        
    
    }

    btn.addEventListener("click", init);

})()