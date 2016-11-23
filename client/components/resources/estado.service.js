'use strict';

function estadoService($resource) {

	return $resource('/api/estado/')

    /*return $resource('/api/estado/', null, {
        'save': {
            method: 'POST',
            transformRequest: function(data, headersGetter) {
                // Here we set the Content-Type header to null.
                var headers = headersGetter();
                headers['Content-Type'] = undefined;

                // And here begins the logic which could be used somewhere else
                // as noted above.
                if (data == undefined) {
                    return data;
                }

                var fd = new FormData();
                var formKey = null;

                var createKey = function(_keys_, currentKey) {
                    var keys = angular.copy(_keys_);
                    keys.push(currentKey);
                    formKey = keys.shift()

                    if (keys.length) {
                        formKey += "[" + keys.join("][") + "]"
                    }

                    return formKey;
                }

                var addToFd = function(object, keys) {
                    angular.forEach(object, function(value, key) {
                        var formKey = createKey(keys, key);

                        if (value instanceof File) {
                            fd.append(formKey, value);
                        } else if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(formKey, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                    fd.append(formKey + '[' + index + ']', file);
                                });
                            }
                        } else if (value && (typeof value == 'object' || typeof value == 'array')) {
                            var _keys = angular.copy(keys);
                            _keys.push(key)
                            addToFd(value, _keys);
                        } else {
                            fd.append(formKey, value);
                        }
                    });
                }

                addToFd(data, []);

                return fd;
            }
        }
    })*/


    /*return $resource('/api/estado/',null,{
            save: {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        }

    )*/

    // AngularJS will instantiate a singleton by calling "new" on this function
}

angular.module('refacciones')
    .service('Estado', estadoService);
