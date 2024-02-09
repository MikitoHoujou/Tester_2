if (typeof dataLayer !== 'undefined') {
    if (dataLayer[0]['MASTER']['Digital Ecosystem'].ip_address !== null) {
        var ipxhr = new XMLHttpRequest();
        ipxhr.onreadystatechange = function() {

            if (ipxhr.readyState === 4) {

                if (ipxhr.status === 200) {

                    if (window.dataLayer) {

                        var ipAddress = ipxhr.responseText.split('\n').map(function(item) {
                            var split = item.split('=');
                            return split[0] === 'ip' ? split[1] : '';
                        }).join('');
                        window.dataLayer[0]['MASTER']['Digital Ecosystem'].ip_address = ipAddress;

                    }

                } else {

                    console.log('Error: ' + window.xhr.status);

                }

            }

        };
        ipxhr.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace');
        ipxhr.send(null);
    }
}