---
title: 자바스크립트 데코레이터 정리
slug: js-decorator
excerpt: js의 데코레이터가 어떤것인지 알아보고 활용하는 방법을 정리해보았다.
date: '2021-12-22T07:32:22.720Z'
last_modified_at: '2021-12-22T12:53:56.984Z'
draft: true
tags:
  - decorator
  - javascript
  - 데코레이터
  - js
categories:
  - JavaScript
---

## 데코레이터 함수란?

데코레이터 함수는 기존 함수의 기능을 유지한채로 새로운 기능을 추가한 함수를 만들어주는 함수이다. 즉, 기존 함수를 래핑하여 다른 기능을 추가하는 함수이다.  

간단한 예시 데코레이터 함수를 만들었다.  
함수를 실행시키는 동안에 찍히는 log를 그룹으로 묶어서 보여주는 데코레이터이다.

```js
function groupLogDecorator(func) {
  return function() {
    const funcName = func.name ?? '';
    console.group(funcName + '함수가 시작됩니다.');
    func.apply(this, arguments);
    console.groupEnd();
    console.group(funcName + '함수가 끝났습니다.');
  };
}

class A {
  data = 'member data'

  aFunc(arg) {
    console.log('aFunc 실행, 매개 변수: ', arg);
    this.bFunc();
  }

  bFunc() {
    console.log('bFunc 실행, 멤버 변수: ', this.data);
  }
}

const testInstance = new A();
testInstance.aFunc = groupLogDecorator(testInstance.aFunc);
testInstance.aFunc('aFunc Arg');
```

**실행 화면**  
aFunc에서 찍히는 log들이 group으로 묶여 나타나는 것을 알수있다.  
![실행화면](/assets/image/2021-12-22-js-decorator/20211222_172915.png)

## ECMAScript에서 Decorator

ECMAScript에서 Decoraotor에 대한 표준이 제정되고 있다.
현재 [2단계 제안](https://github.com/tc39/proposal-decorators) 상태이다. 그전까지 우리는 Babel을 사용하면 된다.

```js
function groupLogDecorator(target, key, descriptor) {
  let method = descriptor.value;
  descriptor.value = function () {
    const funcName = method.name ?? '';
    console.group(funcName + '함수가 시작됩니다.');
    method.apply(this, arguments);
    console.groupEnd();
  }
}

class A {
  data = 'member data'

  @groupLogDecorator
  aFunc(arg) {
    console.log('aFunc 실행, 매개 변수: ', arg);
    this.bFunc();
  }

  bFunc() {
    console.log('bFunc 실행, 멤버 변수: ', this.data);
  }
}

const testInstance = new A();
testInstance.aFunc('aFunc Arg');
```

위에 groupLog 예시에 데코레이터를 적용해보았다.
여기서 `groupLogDecorator`함수를 주목 해보자.
JS 데코레이터 함수에는 세가지 인자가 전달된다.

1. `target`: 현재 인스턴스에 대한 클래스의 프로토타입
2. `name`: 멤버 이름
3. `descriptor`: [propertyDescriptor 객체](#propertydescriptor-객체)

Decorator의 보일러 플레이트는 여기서 확인하길 바란다.

### PropertyDescriptor 객체

1. value : 객체의 값을 정의
2. get:  getter 정의 (writable속성 설정시 사용불가 이유: get/set자체가 writeable 속성이 있는것이므로 )
3. set:  setter 정의
4. enumerable: true/false를 설정해서 프로퍼티 열거 유무를 결정 (for in 또는 Object.keys)
5. writable: 쓰기 여부
6. configurable: true/false를 설정해, 한번 설정 이후 Object define Property로 속성 변경 불가 유무를 결정

## 참고 자료

<https://ko.javascript.info/call-apply-decorators#ref-3561>

<https://ui.toast.com/weekly-pick/ko_20200102>

<https://typescript-kr.github.io/pages/decorators.html>
