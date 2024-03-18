let title=document.getElementById("title");
let Price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("num");
let count=document.getElementById("count");
let Category=document.getElementById("Category");
let createBtn=document.querySelector(".create-btn");
let updateBtn=document.querySelector(".update-btn");
let tbody=document.getElementById("tbody");
let deleteAllBtn=document.querySelector(".deleteAll-btn")
let search=document.getElementById("Search");


function getTotal(){
    if(Price.value !='')
    {
        let res=(+Price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML=res
    }else{
        total.innerHTML='';
    }

}

let data;
if(localStorage.product != null)
{
    data=JSON.parse(localStorage.product)
}
else{
    data=[];
}

createBtn.onclick=function(){
    let obj={
        title:title.value,
        Price:Price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        Category:Category.value,
    }

    if(obj.count>1)
    {
        for(let i=0;i<obj.count;i++)
        {
            data.push(obj)
        }
    }else{
        data.push(obj)
    }
    localStorage.setItem("product",JSON.stringify(data))
    clearData()
    showData()
}

function clearData(){
    title.value='';
    Price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    count.value=''
    Category.value=''
    total.innerHTML=''

}

function showData(){
    let table='';
    for(let i=0;i<data.length;i++)
    {
        table+=`
        <tr>
              <td>${i}</td>
              <td>${data[i].title}</td>
              <td>${data[i].Price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td>${data[i].Category}</td>
              <td><button onclick="updateData(${i})" id="update">Update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
        `
    }
    tbody.innerHTML=table;
    if(data.length>0)
    {
        deleteAllBtn.style.display="block"
        deleteAllBtn.innerHTML=`Delete All ( <span>${data.length}</span> )`
    }else{
        deleteAllBtn.style.display="none"
    }
}

function deleteData(index){
    data.splice(index,1);
    localStorage.product=JSON.stringify(data);
    showData()
}

deleteAllBtn.onclick=function(){
    localStorage.clear();
    data.splice(0)
   showData();
}

function updateData(index){
    title.value=data[index].title;
    Price.value=data[index].Price;
    taxes.value=data[index].taxes;
    ads.value=data[index].ads;
    discount.value=data[index].discount;
    getTotal()
    Category.value=data[index].Category;
    count.style.display="none"
    createBtn.style.display="none"
    updateBtn.style.display="block"

    updateBtn.onclick=function(){
        let obj={
            title:title.value,
            Price:Price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            Category:Category.value,
        }
    
        data[index]=obj;
        localStorage.setItem("product",JSON.stringify(data))
        clearData()
        showData()
        createBtn.style.display="block"
        count.style.display="block"
        updateBtn.style.display="none"
        
    }
    window.scrollTo({
        top: 0
    })
}


let searchMood="byTitle";

function getSearchMood(id){
    if(id=="searchTitle")
    {
        searchMood="byTitle";
        search.placeholder="Search By Title"
    }else{
        searchMood="byCategry";
        search.placeholder="Search By Categery"
    }
    search.focus()
    search.value='';
    showData()
}

function searchData(value){
    let table=""
    if(searchMood=="byTitle")
    {
        for(let i=0;i<data.length;i++)
        {
            if(data[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                      <td>${i}</td>
                      <td>${data[i].title}</td>
                      <td>${data[i].Price}</td>
                      <td>${data[i].taxes}</td>
                      <td>${data[i].ads}</td>
                      <td>${data[i].discount}</td>
                      <td>${data[i].total}</td>
                      <td>${data[i].Category}</td>
                      <td><button onclick="updateData(${i})" id="update">Update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            }
        }

    }else{

        for(let i=0;i<data.length;i++)
        {
            if(data[i].Category.includes(value.toLowerCase())){
                table+=`
                <tr>
                      <td>${i}</td>
                      <td>${data[i].title}</td>
                      <td>${data[i].Price}</td>
                      <td>${data[i].taxes}</td>
                      <td>${data[i].ads}</td>
                      <td>${data[i].discount}</td>
                      <td>${data[i].total}</td>
                      <td>${data[i].Category}</td>
                      <td><button onclick="updateData(${i})" id="update">Update</button></td>
                      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                `
            }
        }



    }
    tbody.innerHTML=table;

}

showData()   //تشتغل علي طول

