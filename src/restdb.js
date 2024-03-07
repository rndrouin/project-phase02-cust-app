  // RD - Declare an empty array
  let items = [];
  
  // RD - Define the Base URL for API Requests
  const baseURL = 'http://localhost:4000/customers';

  // RD - Function that gets all customeres
  export async function getAll(setCustomers) {
    const myInit = {
    method: 'GET',
    mode: 'cors' };
    const fetchData = async (url) => { // RD - FetchData from URL
    try {
    const response = await fetch(url, myInit); // RD - Send Get Request and wait for response
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`); // RD - Error Handling
      }
      const data = await response.json(); // RD - Parse response as JSON - was erroring out before this part
      setCustomers(data); // RD - Update customer state
      } catch (error) {
      alert(error); // RD - Display alert with error
      }
      }
      fetchData(baseURL); // RD - Call FetchData with baseurl
  }

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

// RD - Function to delete a customer by ID
export async function deleteById(id) {
  try {
    const response = await fetch(`${baseURL}/${id}`, {  // RD - Send a DELETE request to the specified URL
      method: 'DELETE',
    });
  // RD - If the response is not OK, throw error
    if (!response.ok) {
      throw new Error(`Error deleting customer: ${response.status}`);
    }
  // RD - Remove the deleted customer from the items array
    items = items.filter((customer) => customer.id !== id);
  } catch (error) {
    alert(error); // RD - Display error
  }
}

// RD - Function to add a new customer
export async function post(item) {
  try {
    // RD - Send POST request to the baseURL with the customer data
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item), // RD - Googled code - Converts Javascript object into a JSON string for the HTTP request
    });
  // RD - If the response is not OK, throw error
    if (!response.ok) {
      throw new Error(`Error adding customer: ${response.status}`);
    }
    // RD - Parse the response body as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}

// RD - Function to update a customer by ID
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

    // RD -  Find the index of the customer in the items array using the ID
    const index = items.findIndex((customer) => customer.id === id);
    
     // RD - Update the customer in the items array with the updated data
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


