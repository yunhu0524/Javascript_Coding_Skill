const dogs = [
   {
     이름 : '맥스',
     크기 : '대형견',
     견종 : '리트리버',
     색상 : '검정색',
   },
    {
     이름 : '도니',
     크기 : '중형견',
     견종 : '도베르만',
     색상 : '검정색',
   },
    {
     이름 : '쌔스',
     크기 : '소형견',
     견종 : '푸들',
     색상 : '흰색',
   }
]
 
function getColor(dogs) {
  return dogs.map((dog) => dog["색상"]);
}
console.log(getColor(dogs)); // [ '검정색', '검정색', '흰색' ]

function getUnique(attributes) {
  const unique = [];
  for (const attribute of attributes) {
    if (!unique.includes(attribute)) {
      unique.push(attribute);
    }
  }
  return unique;
}
const colors = getColor(dogs);
console.log(getUnique(colors));