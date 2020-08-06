// 这个results在不同worker线程访问是不共享的
// results存的是n-1和n-2的结果，而不是整个fabonacci数列
var results = [];

function resultReceiver(event) {
  results.push(parseInt(event.data));
  // 因此，只有满足results长度为2，才再往回postmessage。
  if (results.length == 2) {
    postMessage(results[0] + results[1]);
  }
}

function errorReceiver(event) {
  throw event.data;
}

onmessage = function(event) {
  var n = parseInt(event.data);

  if (n == 0 || n == 1) {
    postMessage(n);
    return;
  }

  for (var i = 1; i <= 2; i++) {
    var worker = new Worker("fibonacci.js");
    worker.onmessage = resultReceiver;
    worker.onerror = errorReceiver;
    worker.postMessage(n - i);
  }
};