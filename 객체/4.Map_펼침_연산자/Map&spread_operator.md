# Map과 Spread_Operator로 키-값 데이터를 순회하라
* 맵에서 반복문 또는 펼침 연사자를 이용해 키-값 데이터를 직접 순회하는 방법을 살펴보자.

앞서 살펴봤듯이 키-값 컬렉션에 항복을 자주 추가하거나 삭제하는경우에는 객체보다 맵을 사용하는 것이 적합합니다. 이처럼 객체는 매우 유용하지만 맵이 분명한 이점을 갖는 경우도 있습니다. 
<br/>
<br/>
객체는 순회하기가 매우 번거롭습니다. 실제로 객체를 직접 순회할 수 있는 방법이 없었습니다. 객체를 순회하려면 항상 그에 앞서 변환해야 했지요. 객체를 순회할 때 `for...in` 문을 사용할 수 있지만, 객체 키 외에는 접근할 수 없습니다. 어떻게 보면 키 배열을 순회하는 것과 크게 다르지 않습니다.

```js 
const filter = {
  색상: '검정색',
  견종: '리트리버'
}

function getFilters(filters){
  // 1.객체의 일부를 배열로 옮긴다.
  const keys = Object.keys(filters);
  const applied = [];
  // 2. for 문으로 키를 순회합니다.
  for (const key of keys){
    // 3. for 문을 실행하는 동안 객체를 참조해 값을 꺼냅니다.
    applied.push(`${key}:${filters[key]}`);
  }
  // 4. for 문을 실행하는 동안 객체를 참조해 값을 꺼냅니다.
  return `선택한 조건은 ${applied.join(',')}입니다.`
}
```

객체에서 순서를 보장되지 않습니다. 이는 객체를 정렬할 수 없다는 의미입니다. 필터링 조건을 정렬하려면 키를 정렬해야 합니다.
```js
function getFilters(filters){
  // 1.객체의 일부를 배열로 옮긴다.
  const keys = Object.keys(filters);
  keys.sort(); // 키 정렬
  const applied = [];
  // 2. for 문으로 키를 순회합니다.
  for (const key of keys){
    // 3. for 문을 실행하는 동안 객체를 참조해 값을 꺼냅니다.
    applied.push(`${key}:${filters[key]}`);
  }
  // 4. for 문을 실행하는 동안 객체를 참조해 값을 꺼냅니다.
  return `선택한 조건은 ${applied.join(',')}입니다.`
}
```
간단한 순회를 위해 관리해야 할 것이 너무나 많습니다. 반면에 맵은 정렬과 순회에 필요한 기능이 내장되어 있습니다.
Map을 사용하기 전에 `for...of`문법을 살펴봅시다. `for...of`는 컬렉션의 각값을 하나씩 반횐합니다. 

```js
const filters = new Map()
    .set('색상','검은색')
    .set('견종','리트리버');

function filters(filters){
  for(const entry of filters){
    console.log(entry);
  }
}
// 결과
// ['색상','검정색']
// ['견종','리트리버']
```
이터레이터는 몇 가지를 동시에 넘겨줍니다. 이터레이터에서 확인할 수 있는 것은 키도 아니고 값도 아니며, 다른 맵을 넘겨주는 것도 아닙니다. 이터레이터는 키-값 쌍을 넘겨줍니다.
<br/>
<br/>
set() 메서드를 이용해서 맵을 구성했지만 여전히 정보를 배열로 변환해 넘겨줍니다. 다음 코드를 살펴보면 맵에 있는 특별한 메서드인 `entries()`를 이용했습니다. `entries()` 메서드는 맵에 있는 키-값을 쌍으로 묶은 맵이터레이터를 반환합니다.
```js
filters.entries();
// MapIterator {['색상','검정색'], ['견종','리트리버']}
```
결과적으로 훨씬 단순하면서도 원래의 데이터 구조를 유지하는 코드를 작성할 수 있습니다.

```js
  function getFilters(filters){
    const applied = [];
    for (const [key, value] of filters){
      applied.push(`${key}:${value}`);
    }
    return `선택한 조건은 ${applied.join(',')}입니다.`
    // 결과 : 선택한 조건은 색상:검정색, 견종:리트리버 입니다.
```
앞에서 경험한 정랼 문제를 여기서도 바로 발견할 수 있십니다. 좋은 소식은 `Map`이 순서를 저장한다는 점입니다. 언제나 `Map`의 첫 번째 항목을 첫 번쨰로 받습니다. 나쁜 소식은 배열의 경우처럼 정렬 메서득 내장되어 있지 않다는 점입니다. (`sort()`)

<br/>
<br/>
다행히 이 문제를 간단하게 해결할 수 있습니다. 바로 펼침 연산자를 이용하는 것입니다. 

```js
...filters;
// 결과: ['색상','검정색'],['견종','리트리버']
```
아마도 다음과 같이 간단하게 코드를 작성할 수 있을 겁니다.

```js
function sortByKey(a,b){
  return a[0] > b[0] ? 1:-1;
}

function filters(filters){
  const applied =[];
  fot(const [key,value] of [...filters].sort(sortByKey)) {
    applied.push(`${key}:${value}`);
  }
 return `선택한 조건은 ${applied.join(',')}입니다.`
    // 결과 : 선택한 조건은 색상:검정색, 견종:리트리버 입니다.
}
```
문제점을 쉽게 놓칠 수도 있습니다. for문의 첫 번째 줄을 보면, 변수를 할당하면서 맵을 빠르게 배열에 펼쳐 넣은 후 정렬하고 있습니다. 우리가 원하던 결과입니다.
<br/>
<br/>
맵으로 시작하기는 했지만 for 문이 실제로 순회하는 것은 맵이 아닙니다. 새로운 배열을 순회하고 있습니다.
<br/>
<br/>
 이건 사실 큰 문제는 아닙니다. 실제로 맵을 배열로 변환한 덕분에 함수를 휠씬 단순하게 만들 수 있었습니다. 이제 배열로 쉽게 변환할 수 있고, 배열 메서드도 원하는 대로 사용할 수 있습니다. 
 
 ```js
 function filters(filters){
  const applied =[...filters].map([key, value]) =>{
    return `${key}:${value}`;
  };
 return `선택한 조건은 ${applied.join(',')}입니다.`
  // 결과 : 선택한 조건은 색상:검정색, 견종:리트리버 입니다.
}

// sort
 function filters(filters){
  const applied = [...filters]
    .sort(sortByKey)
    .map([key, value]) => {
      return `${key}:${value}`;
  }).join(',');
 return `선택한 조건은 ${applied}입니다.`
  // 결과 : 선택한 조건은 색상:검정색, 견종:리트리버 입니다.
}
 ```
> 1. 맵을 배열로 변환합니다.
> 2. 배열을 정렬합니다.
> 3. 배열에 담긴 키-값 쌍을 '키:값' 형식의 문자열로 변환합나디ㅏ.
> 4. 배열의 항목을 연결해서 문자열을 만듭니다.
> 5. 템플릿 리터럴을 이용해서 다른 정보와 함계 문자열로 병합합니다.
