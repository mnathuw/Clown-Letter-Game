export const shuffle = (array) => {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

// Non-duplicated, bugs when num > (end-start)
export const getRandomNumbersBetween = (start, end, num) => {
  let arr = Array.from({ length: end }, (item, index) => index + start);
  arr = shuffle(arr);
  let randomArray = [];
  for (let i = 0; i < num; i++) {
    randomArray.push(arr[i]);
  }
  return randomArray;
};
