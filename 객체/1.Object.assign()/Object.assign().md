# Object.assign()으로 조작 없이 객체를 생성하라

* Object.assign()을 이용해 원본을 조작하지 않고 객체를 갱신하는 방법을 살펴보자.

```js 
const defaulte ={
  author:'',
  title:'',
  year: 2017,
  rating: null,
};

const book = {
  author: 'JoeMorgan',
  title:'Simplifying JavaScript',
}

function addBookDefaults(book,defaults){
  const fields = Object.keys(defaultes);
  const updated={};
  for (let i=0; i < fields.length; i++){
    const field = fields[i];
    updated[field] = book[field]|| defaulte[field];
  }
  return updated;
}
```
이 예제 코드는 딱히 잘못된 부분이 없지만 장황합니다. 이러한 문제가 자주 발생했기 때문에 ES6는 `Object.assgin()` 을 새롭게 추가해 객체의 키-값으로 객체의 필드를 생성하고 갱신할 수 있도록 했습니다. 즉, `Object.assgin()`을 이용하면 다른 객체의 속성을 이용해서 객체를 갱신할 수 있습니다.

그럼 `Object.assgin()`은 어떻게 작동할까요?
```js   
Object.asign(defaults, book);

// 결과 : 
// {
//  author: 'JoeMorgan',
//   title:'Simplifying JavaScript',
//   year: 2017,
//   rating: null,
// };
```
아홉 줄이었던 코드가 한 줄로 줄었지만 원본 객체를 조작하는 문제가 있습니다. 다행히 문제를 피하는 방법은 간단합니다. 첫 번째 객체에 빈객체를 사용하는 것입니다. 그렇게 하면 빈 객체에 새로운 값이 갱신되어 반환됩니다. 다른 객체에는 조작이 발생하지 않습니다.

```js 
const updated = Object.assign({}, defaults, book);
```

이 경우에도 한 가지 문제가 남아있습니다. 
중첩된 객체가 있는 객체를 복사하는 것을 깊은 복사(`deep copy`) 또는 깊은 병합(`deep merge`)이라고 합니다. 

`Object.assgin()`을 이용해서 복사하도록 하면 모든 것을 갱신할 수 있습니다.
```js 
const default = {
  name:{
    first : '',
    last : '',
  },
    years : 0
  }
}

const empluyee = Object.assgin(
  {},
  defaultEmpliyee,
  { 
    name : Object.assgign({},defaultEmployee.name),
  },
);
export { defaults };
```

물론 다른 방법도 있습니다. 로대시[(Lodash)](https://lodash.com/) 라이브러리의 경우 [`cloneDeep()`](https://www.geeksforgeeks.org/lodash-_-clonedeep-method/)이라는 메서드를 이용할 수 있습니다. 

