let elList = document.querySelector(".list")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
elList.innerHTML = "Loading..."

const TOKEN ="7922206174:AAFGJQgCNeCtZ7PcAAs_40NfEmWBjo52Vrk"
const CHAT_ID = "-1002676600416"
const api_massage =`https://api.telegram.org/bot${TOKEN}/sendPhoto`
const api = "https://fakestoreapi.com/products"


// Get products part 
function getProducts() {
    axios(api).then(res => {
        rendrerProducts(res.data, elList)
    })
}
// Get products part 

// Render Products part
function rendrerProducts(arr, list) {
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = " w-[300px] rounded-md overflow-hidden p-3 bg-white shadow-md"
        elItem.innerHTML = `
             <img class="h-[250px] md:h-[250px] mx-auto mb-3" src="${item.image}" alt="Product img" />
             <h2 class="font-bold text-[20px] line-clamp-1 mb-2">${item.title}</h2>
             <p class="line-clamp-3 mb-1">${item.description}</p>
             <strong class="text-[20px] mb-2 inline-block">${item.price} $</strong>
             <button onclick="handleOrder(${item.id})" class="w-full cursor-pointer hover:scale-[1.02] duration-300 py-2 rounded-md bg-green-600 text-white font-semibold">Order</button>
        `
        list.append(elItem)
    })
}
getProducts()
// Render Products part


// Order part
function handleOrder(id) {
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = "Loading..."
    axios(`${api}/${id}`).then(res => {
         elModalInner.innerHTML = `
        <div class="md:flex items-center gap-[30px]">
            <img class="flex items-center md:items-start h-[250px] md:h-[400px] w-[250px] md:w-[300px]  mx-auto mb-[5px]" src="${res.data.image}" alt="" width="300" height="300"/>
            <div class="md:w-[300px] md:pt-[20px]">
                <h2 class="font-bold text-[20px] line-clamp-1 mb-2">${res.data.title}</h2>
                <p class="line-clamp-3 mb-1">${res.data.description}</p>
                <strong class="text-[20px] mb-2 inline-block">${res.data.price} $</strong>
                <form class="space-y-3 lg:pt-[20px] add-form" autocomplete="off">
                    <input required class="p-2 rounded-md outline-none shadow-md w-full border-[1px]" name="name" type="text" placeholder="Enter your name">
                    <input required class="p-2 rounded-md outline-none shadow-md w-full border-[1px]" name="phone" type="tel" placeholder="Enter your phone number">
                    <input required class="p-2 rounded-md outline-none shadow-md w-full border-[1px]" name="address" type="text" placeholder="Enter your address">
                    <button type="submit" class="w-full bg-green-700 text-white font-semibold p-2 rounded-md cursor-pointer hover:scale-[1.02] duration-300">Order</button>
                    </form>
                   <button onclick ="closeModal()" type="submit" class="cursor-pointer py-2 px-5 mt-[30px] ml-[225px] hover:scale-[1.02] duration-300 rounded-md bg-green-700 text-white font-semibold">Back</button>
            </div>
        </div>
    `
    let elForm = document.querySelector(".add-form")
        elForm.addEventListener("submit",function(e){
            e.preventDefault()
            let message = `<b>Title:${res.data.title}</b>\n`
            message += `<b>Description:${res.data.description}</b>\n`
            message += `<b>Description:${res.data.price}</b>\n\n`
             
            message += `<b>Name:${e.target.name.value}</b>\n`
            message += `<b>Phone:${e.target.phone.value}</b>\n`
            message += `<b>Address:${e.target.address.value}</b>\n`
             let data = {
                photo:res.data.image,
                parse_mode:"html",
                caption:message,
                chat_id:CHAT_ID
             }
             axios.post(api_massage,data).then(res =>{
                elModalWrapper.classList.add("scale-0")
             })
        })
    })
}


function closeModal(){
elModalWrapper.classList.add("scale-0")
}
// Order part

