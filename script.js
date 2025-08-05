
let taskInput = document.querySelector('#taskInput');
let addBtn = document.querySelector('.addBtn')
let todoContainer = document.querySelector('.todocontainer');

let API = 'https://6863937c88359a373e9568ac.mockapi.io/api/v1/tasks'


addBtn.addEventListener('click',postData);

async function fetchData(){
      let response = await fetch(API);
      let data = await response.json();
       
      if(data){
        todoContainer.innerHTML = '';

        data.forEach(obj => {
         let div = document.createElement('div');
         div.className = 'todo'
         div.innerHTML = `
                  <p class="paraText">${obj.text}</p>
                  <input type="text" class="editInput" value="${obj.text}" style = "display:none">
               <div class="btns">
                  <button class ='deletBtn'>Delete</button>
                  <button class ='editBtn'>Edit</button>
                  <button class ='saveBtn'>Save</button>
              </div>
         `

        let dBtn = div.querySelector('.deletBtn');
        let edBtn = div.querySelector('.editBtn');
        let sBtn = div.querySelector('.saveBtn');
        let paraText = div.querySelector('.paraText');
        let editInput = div.querySelector('.editInput');
        
        dBtn.addEventListener('click',()=>{
            deleteData(obj.id)
        })

        edBtn.addEventListener('click',()=>{
            
            edBtn.style.display = 'none'; 
            sBtn.style.display = 'inline';
            paraText.style.display = 'none';
            editInput.style.display = 'inline';
        })

        sBtn.addEventListener('click',async ()=>{
            let editValue = editInput.value;
            let response =await updateData(obj.id,editValue)
            if(response.status === 200){
                paraText.textContent = editValue;
                //   fetchData();
                  edBtn.style.display = 'inline'; 
                  sBtn.style.display = 'none'
                  paraText.style.display = 'inline'
                  editInput.style.display = 'none'
                   editInput.value = editValue;
                }
        })

         todoContainer.append(div)
  
        //   console.log(obj);
        });  
      }

}

async function postData() {
    let value = taskInput.value;

    let objData = {
        text: value.trim()
    }

        let response = await fetch(API,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(objData),
        });
        if(response.status === 201){
            fetchData()
        }
        taskInput.value = '';

}

async function deleteData(id){
    let response = await fetch(`${API}/${id}`,{
        method:'DELETE',
    })

    if(response.status === 200){
        fetchData();
    }
}



async function updateData(id,value) {

    let objData = {
        text: value.trim()
    }
    let response = await fetch(`${API}/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(objData),
    });
   
    return response;
    // console.log(response);
    
}
fetchData()