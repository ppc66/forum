export default  function getDate() {
    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconds;
    return time
}