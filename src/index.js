const { compare } = require("semver");

module.exports = function check (str, bracketsConfig) {
  
  if(str.length % 2){
    return false;
  }

  let b = [];
  let openValues = [];
  let closeValues = [];
  let stack = [];

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

  // for(let i = 0; i < str.length; i++){
  //   if(((openValues.includes(str[i]) && closeValues.includes(str[i+1])) && (openValues.indexOf(str[i]) !== closeValues.indexOf(str[i+1]))) ){
  //     return false;
  //   }
  // }

  for(let i = 0; i < str.length; i++){
    if(openValues.includes(str[i])){
      stack.push(str[i]);
    }
    else{
      if(openValues.indexOf(stack.pop()) != closeValues.indexOf(str[i])){
        return false;
      }
    }
  }



  console.log(stack);
  console.log(openValues);
  console.log(closeValues);

  return true;
};

// check ('({})', [['(', ')'], ['[', ']'], ['{', '}'], ['|', '|']]);