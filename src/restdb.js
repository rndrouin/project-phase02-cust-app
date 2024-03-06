/* const items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2 
    }
  ]
*/
  let items = [];
  const baseURL = 'http://localhost:4000/customers';

  export async function getAll(setCustomers) {
    const myInit = {
    method: 'GET',
    mode: 'cors' };
    const fetchData = async (url) => {
    try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
      } catch (error) {
      alert(error);
      }
      }
      fetchData(baseURL);
  }


//export function getAll(){
    // return [...items]; //Troubleshooting returned a copy of the array using spread
  //  return items;
//}

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

export async function deleteById(id) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.status}`);
    }

    items = items.filter((customer) => customer.id !== id);
  } catch (error) {
    alert(error);
  }
}

/*
export function deleteById(id) {
  let arrayIndex = getArrayIndexForId(id);
  if( arrayIndex >= 0 && arrayIndex < items.length){
    items.splice(arrayIndex,1);
  }
}
*/

export async function post(item) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error adding customer: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}
/*
export function post(item) {
  let nextid = getNextId();
  item.id = nextid;
  items[items.length] = item;
}
*/

export async function put(id, item) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Error updating customer: ${response.status}`);
    }

    const data = await response.json();
    const index = items.findIndex((customer) => customer.id === id);
    items[index] = data;
  } catch (error) {
    alert(error);
  }
}


/*
export function put(id, item) {
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      items[i] = item;
      return;
    }
  }
}
*/

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}


function getNextId(){
  let maxid = 0;
  for( let item of items){
    maxid = (item.id > maxid)?item.id:maxid;
  }  
  return maxid + 1;
}


