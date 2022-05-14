const book = {
  title: "Reasons and Persons",
  author: "Deark Parfit",
};
const update1 = { ...book, title: "코딩 & 기술" };
// 결과
// {
//   title:'코딩 & 기술',
//   author:'Deark Parfit',
// }
const update2 = { ...book, year: 1984 };

console.log(update2);