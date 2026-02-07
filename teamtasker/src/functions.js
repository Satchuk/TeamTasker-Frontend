var addTwoNumbers = function(l1, l2) {
    let l1_digit = 0;
    let l2_digit = 0;
    let result = [];
    for(let i = l1.length -1; i > 0;i--){
      l1_digit = l1_digit * 10 + l1[i];
    }
    for(let j = l2.length -1; j > 0;j--){
      l2_digit = l2_digit * 10 + l1[j];
    }
    let sum = l1_digit + l2_digit;
    while(sum/10 > 0){
        let digit = sum % 10;
        result.push(digit);
        sum = Math.floor(sum/10);
    }
    return result;
};

addTwoNumbers([2,4,3],[5,6,4]);