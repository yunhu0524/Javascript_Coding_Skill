# Set
* `Set`를 이용해 고유 항목만 분류하는 방법을 살펴 봅니다.

`Set`는 한 가지 기능만을 매우 잘 수행하는 상당히 단순한 컬렉션으로, 각 고유 항목을 하나씩만 갖는 특화된 배열과 같습니다.

```js
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
   }
    {
     이름 : '쌔스',
     크기 : '소형견',
     견종 : '푸들',
     색상 : '흰색',
   }
 ]
```

색상 조건 목록을 수집하려면 어떻게 해야 할까요? 이 경우에는 강아지가 세 종류뿐이라 답이 뻔하지만, 목록이 늘어나서 강아지가 수백 마리 있다면 어떨까요? 
<br/>
<br/>
모든 색상 집합을 수집하는 방법 중 하나는 배열 메서드인 map()을 사용하는 것 입니다. 일단 `map()` 메서드를 이용하면 색상만 담은 배열을 반환할 수 있다는 것만 이해하면 됩니다.

```js
function getColor(dogs){
  return dogs.map((dog)=> dog['색상']);
}
getColor(dogs);
// 결과 : ['검정색','검정색','흰색']
```
색상을 모두 수집 했으니 중복된 색상이 없고 고윳값만 있는 배열로 바꿔야 합니다.

```js
function getUnique(attributes){
  const unique = [];
  for (const attribute of attributes){
    if(!unique.includes(attribute)){
      unique.push(attribute);
    }
  }
  return unique;
}
const colors = getColors(dogs);
getUnique(colors);
// 결과 : [ '검정색', '흰색' ]
```

이제 이렇게 많은 코드를 쓰지 않아도 됩니다. `Set`객체를 사용해서 고윳값만 분류해낼 수 있습니다. 

```js
const colers = [ '검정색', '검정색', '흰색' ];
const unique = new Set(colors);
// Set { '검정색', '흰색' }
```
문제가 있습니다. 우리가 필요한 것은 세트가 아니라. 고유 속성만 담긴 배열입니다.

```js
function getUnique(attributes){
  return [...new Set(attributes)];
}
```
`Set`에 경우 값을 추가할 때 add(), 검증할 때 has(), 삭제할 때 delete(), clear() 메서드가 있습니다.

```js
function getUnique(dogs){
  const unique = new Set();
  for (const dog of dogs){
    unique.add(dog.색상);
  }
  return unique;
}
getUnique(dogs);
```
위 코드에서 간단한 for문을 사용했습니다. 그런데 `reduce()` 메서드를 이용하면 이 동작을 간단하게 한 줄로 작성할 수도 있습니다.

```js
[...dogs.reduce((colors, {색상})=>colors.add(색상), new Set())];
```