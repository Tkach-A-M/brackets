const { compare } = require("semver");

module.exports = function check(str, bracketsConfig) {



  if ((str.length % 2) != 0){
    return false;
  }


  let openValues = [];
  let closeValues = [];
  let stack = [];
  let openValueIndex;
  let closeValueIndex;
  let flag = false;


    // делим входной массив на 2: с открывающими и закрывающими скобками
  for(let i = 0; i < bracketsConfig.length; i++){
    for(let j = 0; j < bracketsConfig[i].length; j++){
      if(j%2 == 0 ){
        openValues.push(bracketsConfig[i][j]);
      }
      else{
        closeValues.push(bracketsConfig[i][j]);
      }
    }
  }

  for (let i = 0; i < str.length; i++) {
    openValueIndex = openValues.indexOf(str[i]);
    if (openValueIndex != -1 ) {
      if ((closeValues.indexOf(str[i]) != -1) && !flag && (stack.indexOf(openValueIndex) != -1)){
        flag = true;
      } 
      if (!flag) {
        stack.push(openValueIndex);
        continue;
      }
    }
    closeValueIndex = closeValues.indexOf(str[i]);
    openValueIndex = stack.pop();
    if (openValueIndex != closeValueIndex){
      return false;
    }
    flag = false;
  }

  return true;
};



//check ('({})', [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']]);