
// Using a JSON Server
var url = "http://localhost:8000/productRequests"
var userData = "http://localhost:8000/currentUser"

export async function getUserdata(){
    const response = await fetch(userData)
        .then( res => {
            return res.json()
        })
        .then( data => {
            return data
        })
        .catch( err => {
            // console.log(err)
            console.log("GET Error")
        })

    return response
}

export async function getRequests(){
    const response = await fetch(url)
        .then( res => {
            return res.json()
        })
        .then( data => {
            return data
        })
        .catch( err => {
            // console.log(err)
            console.log("GET Error")
        })

    return response
}

export async function getRequest(id){
    const response = await fetch(`${url}/${id}`)
        .then( res => {
            return res.json()
        })
        .then( data => {
            return data
        })
        .catch( err => {
            // console.log(err)
            console.log("GET Error")
        })

    return response
}

export async function postRequest(req){
    const response = await fetch( url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req)
    })
        .then( () => {
            return "Success"
        })
        .catch( err => {
            // console.log(err)
            console.log("POST Error")
        })

    return response
}

export async function updateRequest(id, data){
    const response = await fetch( `${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then( () => {
            return "Success"
        })
        .catch( err => {
            // console.log(err)
            console.log("DELETE Error")
        })

    return response
}

export async function deleteRequest(id){
    const response = await fetch( `${url}/${id}`, { method: "DELETE" })
        .then( () => {
            return "Success"
        })
        .catch( err => {
            // console.log(err)
            console.log("DELETE Error")
        })

    return response
}


