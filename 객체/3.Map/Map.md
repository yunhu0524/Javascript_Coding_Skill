# Map으로 명확하게 키-값 데이터를 갱신하라

* 데이터 변경이 키-값 컬렉션에 맵 객체를 사용하는 방법을 살펴보자.

맵은 특정 작업을 매우 쉽게 처리하는 특별한 종류의 컬렉션입니다. MDN에는 일반적인 객체보다 맵을 컬렉션으로 선택하는 것이 나은 상황이 잘 정리되어 있습니다. [(MDN_Map)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
<br/>
> * 키-값 쌍이 자주 추가되거나 삭제되는 경우
> <br/>
> * 키가 문자열이 아닌 경우

```js 
const dogs = [
  {
    이름 : '맥스',
    크기 : '소형견',
    견종 : '보스턴테리어',
    색상 : '검정색',
  },
   {
    이름 : '도니',
    크기 : '대형견',
    견종 : '푸들',
    색상 : '하얀색',
  },
   {
    이름 : '쌔도',
    크기 : '중형견',
    견종 : '리트리버',
    색상 : '검정색',
  },
]

let filters = {}
// 추가
function addFilters(filters, key, value){
  filters[key] = value;
}
// 조건 삭제
function delteFilters(filters, key){
  delete filters[key];
}
// 모든 조건 삭제
function clearFilters(filters){
  filters = {};
  return filters;
}
```
여기서 이상한 점은 단지 세 가지 기본적인 동작을 수핼하는 데도 불구하고 서로 다른 세 가지 패러다임을 적용한다는 것입니다. 
<br/>
<br/>
맵은 객체와 다르게 키-값 쌍을 자주 변경하는 경우에 적합하도록 특별히 설계되었습니다. 인터페이스가 명확하고 메서드는 예측 가능한 이름을 가지고 있으며, 반봅과 같은 동작이 내장되어 있습니다. 맵을 사용하면 좀 더 생산성 높은 개발자가 될 수 있습니다. 더 많이 예측할수록 더 빨리 만들 수 있습니다.
<br/>
<br/>
먼저 새로운 맵 인스턴스를 생성하고 몇 가지 데이터를 추가합시다. 중괄호로 생성자를 대신할 수 있는 객체와 달리, 맵에서는 항상 명시적으로 새로운 인스턴스를 생성해야 합니다.
```js
let filters = new Map();
```
위의 코드를 보면 새로운 맵을 할달할 때 let을 사용했습니다. let을 사용한 이유는 데이터를 추가하면서 객체를 조작할 것이기 때문입니다. 앞서 많은 시간을 할애해 조작의 나쁜 점을 살펴봤지만, 이 예제처럼 데이터를 추가하거나 삭제하 때마다 반드시 조작을 거쳐야 하는 객체가 필요한 경우도 있습니다. 
<br/>
<br/>
set() 메서드를 이용해서 데이터를 추가합니다.
```js
filters.set('견종','래브라도레트리버');
```
get() 메서드를 사용해 데이터를 가져 옵니다.
```js
filters.get('견종');
```
메서드를 차례로 연결해서 여러 값을 쉡게 추가할 수 있습니다. 새로운 인스턴스를 생성하고 바로 메서드를 연결할 수도 있습니다. 이런 방법을 체이닝이라고 부릅니다.
```js
let filters = new Map()
  .set('견종', '푸들')
  .set('크기', '대형견')
  .set('색상', '갈색')

filter.get('견종'); // 결과 : 푸들
```

데이터를 추가하는 다른 방법도 있습니다. 배열을 이용해서 정보를 추가할 수 있지요.
```js
let filters = new Map(
  [
    ['견종', '푸들'],
    ['크기', '대형견'],
    ['색상', '갈색'],
  ]
) 

filter.get('견종'); // 결과 : 푸들
```
맵에서 값을 제거할 때는 언어에서 지원하는 연산자 대신 delete() 메서드를 사용하면 됩니다. 
```js
filters.delete('색상');
filter.get('색상'); // 결과 : undefined
```
마찬가지로 모든 키-값 쌍을 제거할 때는 clear() 메서드를 사용합니다.
```js
filters.clear()
filters.get('색상');
```
여기서 살펴본 맵의 메서드를 이용하면 객체 대신 맵을 사용하도록 함수를 변경할 수 있습니다.
```js
const petFilters = new Map()

function addFilters(filters, key, value){
  filters.set(key, value);
}
function deleteFilters(filters, key){
  filters.delete(key);
}
function clearFilters(filters, key, value){
  filters.clear();
}
```

변경 사항은 많지 않지만, 매우 중요합니다. 먼저 코드가 훨씬 명료하게 보입니다. 그 자체만으로도 큰 이점이입니다. 그러나 객체를 이용해서 만들었던 함수와 비교해보면 훨씬 큰 이점을 발견할 수 있습니다. 새로 작성한 함수에서 다음과 같은 특징을 찾아볼 수 있습니다.

> * 맵 인스턴스에 항상 메서드를 사용합니다. <br/>
> * delete() 메서드를 사용할 수 있기 때문에 인스턴스를 생성한 후에는 언어 수준의 연산자를 섞지 않습니[p다.
> * clear() 메서드를 사용할 수 있기 때문에 새로운 인스턴스를 생성할 필요가 없습니다.

따라서 정보를 자주 변경하는 경우에는 객체보다 맵을 사용하는 것이 훨씬 편리합니다. 모든 동작과 의도가 매우 명료하게 보입니다.
<br/>
<br/>
객체의 경우 키에 사용할 수 있는 자료형에 제약이 있습니다. 객체에는 특정한 자료형의 키만 사용할 수 있습니다. 가장 중요한 점은 정수를 키로 사용할 수 없다는 것입니다. 이는 수와 관련되 키를 저장할 때 문제가 될 수 있습니다. 다음과 갑이 오류 코드를 담은 객체를 예로 들 수 있습니다.
```js
const errors = {
  100 : '이름이 잘못되었습니다',
  110 : '문자가 잘못되었습니다',
  120 : '색상이 잘못되었습니다',
}
```
맵에는 위와 같은 문제가 없습니다. 맵은 여러 가지 자료형을 키로 받을 수 있습니다.
```js
let errors = new Map([
  [100, '이름이 잘못되었습니다'],
  [110, '이름에는 문자만 입력할 수 있습니다.'],
  [200, '색상이 잘못되었습니다.'],
]);
errors.get(100);
```
맵도 객체와 마찬가지로 키만 모아서 확인할 수 있십니다. 궁금하다면 다음과 같이 실행해보세요.
```js
errors.keys();
// 결과 : MapIterator {100, 110, 200}
```
객체에 Object.keys()를 적용한 것과는 다르게 배열이 반환되지 않았습니다. 객체나 다른 맵이 반환된 것도 아닙니다. 반환된 값은 맵이터레이터(`MapIterator`)라고 부릅니다. 새로운 용어가 또 나왔지만 걱정하지 마세요. 맵이터레이터는 사실 매우 유용한 기능입니다. 맵이터레이터를 이용하면 데이터를 순회할 수 있습니다.