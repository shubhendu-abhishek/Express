var addUser = function () {
    $.post('/user/add', { name: $('#name').val(), age: $('#age').val() }, function (e, d) {
        alert('Added Successfully!.');
        getUser();
        $('#name').val('');
        $('#age').val('');
    }, 'json');
}
var getUser = function () {
    $.post('/user/list', {}, function (r) {
        var data = '';
        for (var i = 0; i < r.length; i++) {
            data += '<tr><td>' + r[i].name + '</td><td>' + r[i].age + '</td></tr>';
        }
        $('#list').html(data);
    }, 'json');
}
getUser();
var modifyUser = function () {
    $.post('/user/modify', { name: 'kity' }, function (r) {
        if (r) {
            getUser();
        }
    }, 'json');
}