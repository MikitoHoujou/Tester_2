var Asagao = Asagao || {};

Asagao.namespace = function (namespaceString) {
    var parts = namespaceString.split('.'), parent = Asagao, i;

    // strip redundant leading global
    if (parts[0] === 'Asagao') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};