const TYPE_GET = 'GET',
      TYPE_DELETE = 'DELETE',
      TYPE_POST = 'POST',
      TYPE_PUTH = 'PUTH';

const URL_LOCAL = '/api/v1/';
class Net {
    constructor(path) {
        this.isLoad = false;
        this.pool = [];
        this.path = path ? path : '';
        this.cacheResult = [];
        this.cacheRequest = undefined;
        this.const = {
            URL_LOCAL   : URL_LOCAL,
            TYPE_GET    : TYPE_GET,
            TYPE_POST   : TYPE_POST,
            TYPE_PUTH   : TYPE_PUTH,
            TYPE_DELETE : TYPE_DELETE,
        };
        this.errDefaultCallback = {};
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    }
    //===========================================
    headerRemote(){
        if(!this.pool.length){
            throw 'Pool is empty';
        }
        this.pool[this.pool.length - 1].isRemote = true;

        let secret = 'code'; //localStorage.getItem('secret');
        return this.headers({
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization'   : 'Basic ' + (secret ? secret : ''),
            'Content-Type'    : 'application/json',
        });
    }
    headers(headers){
        if(!this.pool.length){
            throw 'Pool is empty';
        }
        this.pool[this.pool.length - 1].headers = headers;
        return this;
    }
    //===========================================
    //  Установить авторизацию
    setAuthorization(value){
        axios.defaults.headers.common['Authorization'] = value;
        return this;
    }
    // Установить вызов дефолтных ошибок
    setDefaultError(code, callback){
        this.errDefaultCallback[!code ? '*' : code] = callback;
    }
    //===========================================
    setParametrs(callback){
        if(!this.pool.length){
            throw 'Pool is empty';
        }
        let item = this.pool[this.pool.length - 1];
        this.pool[this.pool.length - 1] = callback(item);
        return this;
    }
    onSuccess(callback){
        if(!this.pool.length){
            throw 'Pool is empty';
        }
        this.pool[this.pool.length - 1].onSuccess = callback;
        return this;
    }
    onError(callback){
        if(!this.pool.length){
            throw 'Pool is empty';
        }
        this.pool[this.pool.length - 1].onError = callback;
        return this;
    }
    onMessage(success, error){
        this.onSuccess(success);
        this.onError(error);

        return this;
    }
    //===========================================
    ajax(url, method, data){
        if(!Array.isArray(url)){
            url = [url];
        }
        for (let i in url) this.pool.push({
            url     : this.path + url[i],
            method  : method,
            data    : data,
            isReturnResult : (url.length === 1 || i === url.length - 1)
        });

        if(this.isLoad){
            return this;
        }
        this.isLoad = true;
        setTimeout(()=>{
            this.load(this.pool.shift());
        }, 100);

        return this;
    }
    serialize (url, obj, prefix) {
        let remove = [];

        if(url.length > 0) {
            url = url.replace(/{([a-z]*)}/g, (all, key) => {
                if (obj[key]) {
                    remove.push(key);
                }
                return obj[key];
            });
            // Удаляем найденные элементы
            for (let i in remove) {
                if(obj[remove[i]]) {
                    delete obj[remove[i]];
                }
            }
        }

        //=================================================
        let str = [], p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                let k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];

                str.push((v !== null && typeof v === "object") ?
                    this.serialize("", v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return (url.length > 0 ? url + (obj.length > 0 ? (url.indexOf('?') === -1 ? '?' : '&') : '') : '')
            + str.join("&");
    }
    // Загрузка
    load(data){
        let request = {
            url    : data.url,
            method : data.method,
            responseType : 'json',
        };
        if(data['headers']){
            request.headers = data['headers'];
        }
        else{
            request.headers = {};
        }
        //=====================================
        // Авторизация
        if(data.isReAuth){
            request.headers['Authorization'] = "Refresh " + localStorage.getItem('refresh');
        }
        else if(localStorage.getItem('access')) {
            request.headers['Authorization'] = "Access " + localStorage.getItem('access');
        }
        //=====================================
        request.headers['X-Requested-With'] = 'XMLHttpRequest';
        // request.headers['*']     = 'yesddsad';
        //------------------------------------
        switch (data.method) {
            case TYPE_GET:
            case TYPE_DELETE:
                if(data.data) {
                    request.url = this.serialize(data.url, data.data);
                }
                break;

            case TYPE_POST:
            case TYPE_PUTH:
                /*request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                let formData = new FormData();
                for(let name in data.data){
                    formData.append(name, data.data[name]);
                }
                request.data = formData;*/

                request.data = data.data;
                break;
        }
        if(data.reset) {
            this.cacheRequest = !data.isReAuth ? request : false;
        }
        axios(request)
            .then(response => {
                let code   = response.status;
                let result = response.data.result || response.data.results || response.data.success;
                if(response.headers['access-token']){
                    localStorage.setItem('access',  response.headers['access-token']);
                    localStorage.setItem('refresh', response.headers['refresh-token']);
                }

                if (!result || !data.isReturnResult) {
                    return;
                }
                // Дич
                if(!data.onSuccess){

                }
                else if(typeof data.onSuccess === 'string') {
                    showSuccess('Успешно!', data.onSuccess);
                }
                else{
                    data.onSuccess(
                        result,
                        code,
                        response
                    );
                }
            })
            .catch(error => {
                let code        = error.response ? error.response.status : 500;
                let errCallback = data.onError;

                if(!data.onError){
                    errCallback = this.errDefaultCallback[code] ? this.errDefaultCallback[code] : this.errDefaultCallback['*'];
                    if(!errCallback){
                        return;
                    }
                }
                if(typeof data.onError === 'string') {
                    showError('Ошибка!', data.onError);
                    return;
                }
                errCallback(error, code);

            })
            .then(() => {
                if (this.pool.length === 0){
                    this.isLoad = false;
                    return;
                }
                this.load(this.pool.shift());
            });
    }
    createUrl(url){
        return this.path + url;
    }
    getHeaders(){
        let headers = {};
        headers['Authorization'] = "Access " + localStorage.getItem('access');
        return headers;
    }
    //==================================================
    // Сокращения
    get(url, data){
        return this.ajax(url, TYPE_GET, data);
    }
    post(url, data){
        return this.ajax(url, TYPE_POST, data);
    }
    puth(url, data){
        return this.ajax(url, TYPE_PUTH, data);
    }
    delete(url, data){
        return this.ajax(url, TYPE_DELETE, data);
    }
    // auth(){
    //     return get('client/portfolio/get-list', {
    //         headers : {
    //             'Authorization' : 'Refresh ' + localStorage.getItem('refresh'),
    //         },
    //     });
    // }
    authRequest(){
        if(!this.cacheRequest){
            return false;
        }

        this.cacheRequest.isReAuth = true;
        this.pool.unshift(this.cacheRequest);

        this.cacheRequest = false;

        return true;
    }
    updateUser(callback){
        this.get('client/profile/get').
            onSuccess(callback);
    }
}


window.net = new Net('http://ccs-dev.ru/api/');