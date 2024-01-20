const host = 'http://localhost:3030'
async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }
    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }
    try {
        const response = await fetch(host + url, options)
        let result;
        if (response.status != 204) {
            result = await response.json();
        }
        if (response.ok != true) {
            if (response.status == 403) {
                localStorage.removeItem('userData')

            }
            throw result
        }
        return result
        }catch (err) {
            alert(err.message)
        }
    }
    export const get = request.bind(null, 'get')
    export const post = request.bind(null, 'post')
    export const put = request.bind(null, 'put')
    export const del = request.bind(null, 'delete')
   

    