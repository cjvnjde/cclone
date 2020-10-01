const fs = require('fs-extra')
const moment = require('moment');
const path = require('path');

const regExpRule = /(?<={{)(.*?)(?=}})/;
const regExpSplit = /[\/\\]/;

function ccopy(from, to, callback) {
  const now = moment();

  const pathArr = to.split(regExpSplit);
  let fileName = pathArr.pop();
  const datesList = fileName.match(regExpRule);

  datesList.forEach((cur) => {
    fileName = fileName.replace(`{{${cur}}}`, now.format(cur));
  });

  const formattedPath = path.join(...pathArr, fileName);

  fs.copy(from, formattedPath).then(callback);
}

module.exports = ccopy;
