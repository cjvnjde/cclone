const fs = require('fs');
const moment = require('moment');

function ccopy(from, to, callback) {
  const splittedTo = to.split(/[\/\\]/);
  const fileName = splittedTo.pop();
  let isStarted = false;
  let pattern = '';
  let toRepl = '';
  let tempName = fileName.split('').reduce((acc, cur) => {
    if (cur !== '`') {
      if (isStarted) {
        acc += '^';
        pattern += cur;
        toRepl += '^';
      } else {
        acc += cur
      }
    } else {
      isStarted = !isStarted;
    }

    return acc;
  }, '');

  const date = moment().format(pattern);
  tempName = tempName.replace(toRepl, date);

  const toWithDAte = splittedTo.join('/') + '/' + tempName;
  fs.copyFile(from, toWithDAte, callback);
}

module.exports = ccopy;
