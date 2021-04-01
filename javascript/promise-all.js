const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 1000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res('2')
  }, 2000);
})

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res(3);
  }, 3000);
})

const p4 = (function() { return 4})();

function promiseAll(promiseArray) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) return reject(new Error('传入的参数必须为数组'));

    const result = [];
    const promiseNums = promiseArray.length;
    let counter = 0;

    for (let i = 0; i < promiseNums; i++) {
      Promise.resolve(promiseArray[i]).then((value) => {
        result[i] = value;
        counter++;
        if (counter === promiseNums)  resolve(result);
      }).catch((err) => reject(err))
      
    }
  })
}

promiseAll([p1, p2, p3, p4]).then((res) => {
  console.log(res, 'allres');
}).catch((err) => {
  console.log(err, 'allerr');
})

// p2.then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err, 'err');
// })