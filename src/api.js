const endpoint = 'http://localhost:49219/api/';

/*** Api - HTTP wrapper - is responsible for sending requests to server and relay parsed JSON response ***/

const Api = {
  get(path) {
    return request('GET', path);
  },
  post(path, data = {}) {
    return request('POST', path, data);
  },
  put(path, data = {}) {
    return request('PUT', path, data);
  },
  delete(path) {
    return request('DELETE', path);
  },
};

const headers = () => {
  const h = new Headers();

  h.append('Content-Type', 'application/json');

  //token inclusion for each service request
  let accessToken = localStorage.getItem('access_token');
  if (accessToken && accessToken !== '') {
    h.append('Authorization', 'Bearer ' + accessToken);
  }
  return h;
};

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}


const request = (method, path, body) => {
  const url = `${endpoint}${path}`;
  const options = { method, headers: headers() };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(handleErrors)
      .then(res => resolve(res.json()))
      .catch(error => reject(error.message));
  });
};

export default Api;