var deleted = new HashTable({});
var quarantened = new HashTable({});

function renderXml() {
    var f = document.getElementById('recipeTextarea');

    var content = '<?xml version="1.0"?><recipe>';

    quarantened.each(function (key, value) {
        content += '<quarantine>' + value + '</quarantine>';
    });

    deleted.each(function (key, value) {
        content += '<delete>' + value + '</delete>';
    });

    f.value = content + "</recipe>";
}

function triggerLink(id, state) {
    var obj = document.getElementById(id);
    if (obj) {
        if (state) {
            //obj.style.fontWeight = 'bold';
            obj.style.textDecoration = 'line-through';
        } else {
            obj.style.fontWeight = 'normal';
            obj.style.textDecoration = '';
        }
    }
}

function add_quarantine(uid, name) {
    if (quarantened.hasItem(uid)) {
        triggerLink('q_' + uid, false);
        quarantened.removeItem(uid);
    } else {
        triggerLink('q_' + uid, true);
        quarantened.setItem(uid, name);
    }

    renderXml();

    return false;
}

function add_delete(uid, name) {
    if (deleted.hasItem(uid)) {
        triggerLink('d_' + uid, false);
        deleted.removeItem(uid);
    } else {
        triggerLink('d_' + uid, true);
        deleted.setItem(uid, name);
    }

    renderXml();

    return false;
}