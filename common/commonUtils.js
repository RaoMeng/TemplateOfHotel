//数据转化  
function formatNumber(n) {
     n = n.toString()
     return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(number, format) {

     var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
     var returnArr = [];

     var date = new Date(number);
     returnArr.push(date.getFullYear());
     returnArr.push(formatNumber(date.getMonth() + 1));
     returnArr.push(formatNumber(date.getDate()));

     returnArr.push(formatNumber(date.getHours()));
     returnArr.push(formatNumber(date.getMinutes()));
     returnArr.push(formatNumber(date.getSeconds()));

     for (var i in returnArr) {
          format = format.replace(formateArr[i], returnArr[i]);
     }
     return format;
}


//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
     var r1, r2, m;
     try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
     try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
     m = Math.pow(10, Math.max(r1, r2))
     return (arg1 * m + arg2 * m) / m
}
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
     return accAdd(arg, this);
}

//减法函数，用来得到精确的减法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSub(arg1,arg2)
//返回值：arg1减去arg2的精确结果
function accSub(arg1, arg2) {
     var r1, r2, m, n;
     try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
     try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
     m = Math.pow(10, Math.max(r1, r2));
     //last modify by deeka
     //动态控制精度长度
     n = (r1 >= r2) ? r1 : r2;
     return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//除法函数，用来得到精确的除法结果
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
//调用：accDiv(arg1,arg2)
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
     var t1 = 0, t2 = 0, r1, r2;
     try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
     try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
     r1 = Number(arg1.toString().replace(".", ""))
     r2 = Number(arg2.toString().replace(".", ""))
     return (r1 / r2) * Math.pow(10, t2 - t1);
}
//给Number类型增加一个div方法，调用起来更加方便。
Number.prototype.div = function (arg) {
     return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
     var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
     try { m += s1.split(".")[1].length } catch (e) { }
     try { m += s2.split(".")[1].length } catch (e) { }
     return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//版本比较
function compareVersion(v1, v2) {
     v1 = v1.split('.')
     v2 = v2.split('.')
     var len = Math.max(v1.length, v2.length)

     while (v1.length < len) {
          v1.push('0')
     }
     while (v2.length < len) {
          v2.push('0')
     }

     for (var i = 0; i < len; i++) {
          var num1 = parseInt(v1[i])
          var num2 = parseInt(v2[i])

          if (num1 > num2) {
               return 1
          } else if (num1 < num2) {
               return -1
          }
     }

     return 0
}

module.exports = {
     dateFormat: formatTime,
     floatAdd: accAdd,
     floatSub: accSub,
     floatDiv: accDiv,
     floatMul: accMul,
     compareVersion: compareVersion
};