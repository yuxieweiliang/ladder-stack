export const chunk1 = '13';
export const chunk2 = '13';
export const chunk3 = '13';
export const chunk4 = '13';
export const chunk5 = '13';
require([
  './chunk2'
], function(aaa) {
  console.log(aaa);
});
