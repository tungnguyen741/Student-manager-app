/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

//App Contact
var readlineSync = require('readline-sync');
var fs = require('fs');

var dataArr = [];
function showMenu(){
  var selection = readlineSync.question('\n1. Nhap du lieu contact (name, phone number) \n2. Sua du lieu contact \n3. Xoa contact \n4. Tim kiem contact\n5. EXIT \n>');

  switch(selection){
      case '1':
          inputContact();
          break;
      case '2':
          editContact();
          break;
      case '3':
          deleteContact();
          break;
      case '4':
          findContact();
          break;
      default: 
      break;
  }
}

showMenu();

//input
function inputContact(){
  var dataObj ={};
  dataObj.name = readlineSync.question('\nMay I have your name? ');
  dataObj.phoneNumber = readlineSync.question('May I have your Phone number? ');
  dataArr.push(dataObj);
  var dataString = JSON.stringify(dataArr);
 
  fs.writeFileSync('./data.json', dataString);
  
  var select = readlineSync.question('\nDo you want input continue(Y/N): ');

  if(select == 'Y' || select == 'y'){
    inputContact();
  }
  else{
    contactPresent();
    showMenu();

  }
}

//show contact present
function contactPresent(){
  var contact = fs.readFileSync('./data.json', 'utf8');
  var contactObj = JSON.parse(contact);

  console.log('\nContact Present: ');
  for(var info of contactObj){
    console.log(info.name, info.phoneNumber);
  } 
}

// edit
function editContact(){
  
  contactPresent();
  var contact = fs.readFileSync('./data.json', 'utf8');
  var contactObj = JSON.parse(contact);

  var editWho = readlineSync.question('\n-What do you want edit who?(Name): ' );
   for(var info of contactObj){
    if(editWho == info.name){
      var editName = readlineSync.question('-> Name want edit: ' );
      info.name = editName;
      var editPhone = readlineSync.question('-> PhoneNumber want edit: ' );
      info.phoneNumber = editPhone; 
    }
  }
  
  fs.writeFileSync('./data.json', JSON.stringify(contactObj) );
  console.log('Contact after edit\n');
  for(var info of contactObj){
    console.log(info.name, info.phoneNumber);
  }
  showMenu();
}

//xóa contact
function deleteContact(){
  console.log('\nContact Present: ');
  var contact = fs.readFileSync('./data.json', 'utf8');
  var contactObj = JSON.parse(contact);
  for(var info of contactObj){
    console.log(info.name, info.phoneNumber);
  } 

  var editWho = readlineSync.question('What do you want delete who?(Name/Phone): ' );
   for(var i = 0; i < contactObj.length ; i++){
    if(editWho == contactObj[i].name || editWho == contactObj[i].phoneNumber){
      delete contactObj[i].name; 
      delete contactObj[i].phoneNumber;
      contactObj.splice(i,1);
    } 
  }

  fs.writeFileSync('./data.json', JSON.stringify(contactObj) );
  
   console.log('Contact after edit\n');
  for(var info of contactObj){
    console.log(info.name, info.phoneNumber);
  }

  showMenu();
}
//bo dấu
function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
}

//tìm kiếm
function findContact(){
  var contact = fs.readFileSync('./data.json', 'utf8');
  var objContactInArray = JSON.parse(contact);
  var findInfo = readlineSync.question('input Name or phone you want find: ' );
  var findInfoLow = findInfo.toLowerCase();
  var nameKoDau = bodauTiengViet(findInfo);
  var arrName = objContactInArray.find(function(item,a,b){
    return bodauTiengViet(item.name) == nameKoDau || item.phoneNumber == findInfo || item.phoneNumber.includes(findInfo) || item.name.includes(findInfo) || item.name.toLowerCase() == nameKoDau;
  });

  if(arrName){
    console.log('Contact: '+ arrName.name, arrName.phoneNumber);
  }else{
    console.log('Not found!! ', findInfo);
  }
  showMenu();
}
 