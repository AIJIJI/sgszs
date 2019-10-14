const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max-min+1));
}


function product(iterables, repeat) {
  var argv = Array.prototype.slice.call(arguments), argc = argv.length;
  if (argc === 2 && !isNaN(argv[argc - 1])) {
    var copies = [];
    for (var i = 0; i < argv[argc - 1]; i++) {
      copies.push(argv[0].slice()); // Clone
    }
    argv = copies;
  }
  return argv.reduce(function tl(accumulator, value) {
    var tmp = [];
    accumulator.forEach(function (a0) {
      value.forEach(function (a1) {
        tmp.push(a0.concat(a1));
      });
    });
    return tmp;
  }, [[]]);
}

function arrayEqual(arr1, arr2) {
  return arr1.every((v, i) => v === arr2[i])
}

function groupNumber(numbers) {
  let correct_results = []
  for (let prefix of product([-1, 0, 1], numbers.length)) {
    if (prefix.some(x => x === 1) && 
        prefix.reduce((s, i) => s + i) >= 0 &&
        prefix.map((x, i) => x * numbers[i]).reduce((s, i) => s + i) == 0 ) {
      
      if (prefix.reduce((s, i) => s + i) == 0) {
        // 数量相等两组，只保留一个结果
        const nege_prefix = prefix.map(x => x * -1)
        if (!correct_results.find(i => arrayEqual(i, nege_prefix))) {
          correct_results.push(prefix)  
        }
      } else {
        correct_results.push(prefix)
      }
    }
  }
  
  let grouped_result = []
  for (let prefix of correct_results) {
    let groups = [[], [], []]
    for (let i in prefix) {
      const index = (prefix[i]==0) ? 2 : ((prefix[i]==1)?0:1)
      groups[index].push(numbers[i])
    }
    for (let i in groups) {
      groups[i].sort((i, j) => i-j)
    }
    if (!grouped_result.find(i => i.every((_, j) => arrayEqual(i[j], groups[j])))) {
      grouped_result.push(groups)
    }
  }
  if (grouped_result.length > 3) {
    grouped_result.sort((i, j) => i[2].length - j[2].length)
    return grouped_result.slice(0, 3)
  }
  return grouped_result
}



module.exports = {
  formatTime: formatTime,
  getRandomInt: getRandomInt,
  product: product,
  groupNumber: groupNumber,
}