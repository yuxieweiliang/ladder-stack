
{/*
<div class="form-title" id="username">名字：</div>
<input class="form-control" type="text">
  </div>
  <div class="form-list">
  <div class="form-title" id="sex">性别：</div>
<input class="form-control" type="text">
</div>
<div class="form-list" id="age">
  <div class="form-title">年龄：</div>
  <input class="form-control" type="text">
  </div>
  <div class="form-list">
  <div class="form-title" id="race">种族：</div>
<input class="form-control" type="text">
*/}



$(function() {
  var $username = $('#username').val();
  var $sex = $('#sex').val();
  var $age = $('#age').val();
  var $race = $('#race').val();
  var $saveBtn = $('#save');

  $saveBtn.on('click', function(e) {
    console.log('ffffff');
    let options = {
      method: 'GET',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      }),
    };

    fetch('http://10.0.0.22:3000/save').then(function(response) {
      return response.json()
    }).then(function(res) {
      console.log(res)
    })
  })
});