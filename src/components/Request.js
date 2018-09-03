function Request() {
    let self = this;
    this.cache = {};

    return function (url) {
        if (self.cache[url]) return Promise.resolve(self.cache[url]);
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status === 200) {
                    let result = JSON.parse(xhr.response);
                    self.cache[url] = result;
                    resolve(result);
                } else reject(xhr.status);
            };
            xhr.send();
        });
    };
}

export default Request;