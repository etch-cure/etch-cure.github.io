---
title: Effective C++ 리뷰 (1장 ~ 2장)
slug: effective-cpp-review
excerpt: Effective C++의 1장 ~ 2장을 읽고 요약했다.
date: '2021-10-25T16:19:27.960Z'
last_modified_at: '2021-10-25T16:15:32.445Z'
draft: false
tags:
  - C++
  - Effective C++
categories:
  - C++
  - Effective C++
---

# 1장. C++에 왔으면 C++의 법에 따릅시다

## 항목1. C++를 언어들의 연합체로 바라보는 안목은 필수

- C++는 여러 개념의 연합체이다.  
- C, 객체 지향 개념의 C++, 템플릿 C++, STL로 이루어져 있다.

## 향목2. #define을 쓰려거든 const, enum, inline을 떠올리자

- '#' 으로 시작하는 예약어들은 전처리기에 의해 동작한다.  
- #define으로 상수를 만드는 경우 컴파일 타이밍에 이미 소스가 바뀌어 기호 테이블에 이름이 없어 어떤 상수인지 몰라 디버깅하기 힘들다. 이때 const, enum을 사용하여 처리하면 된다.  
- #define으로 함수를 만드는 경우 오동작을 일으키는 경우를 만들 수 있으므로 inline 함수로 만들도록 한다.

  ```c++
  #define CALL_WITH_MAX(a,b) f((a) > (b) ? (a) : (b))

  int a = 5, b = 0;
  CALL_WITH_MAX(++a, b); // a가 두번 증가
  CALL_WITH_MAX(++a, b + 10); // a가 한번 증가
  ```

## 항목 3. 낌새만 보이면 const를 들이대 보자

- const 변수 예제

  ```c++
  char greeting[] = "Hello";
  char *p = greeting; // 비상수 포인터, 비상수 데이터
  const char *p = greeting; // 비상수 포인터, 상수 데이터
  char * const p = greeting; // 상수 포인터, 비상수 데이터
  const char * const p = greeting; // 상수 포인터, 상수 데이터
  ```

- const는 의도치 않은 에러를 잡아줄 뿐만 아니라 디버깅 하기 편하게 해준다. 예를 들어 참조로 객체를 반환했을 때, 나도 모르는 함수에서 객체의 값을 변경하는 경우를 막을 수 있다.
- 포인터를 상수로 하거나 포인터가 가르키는 값을 상수로 하거나 **상수 멤버함수**를 적절히 사용하자.

  ```c++
  // 상수 멤버 함수 ex
  // 2번째 const
  const int& func(int arg) const { return num[arg]; }
  ```

- 상수 멤버함수에서도 변경할 수 있는 데이터 멤버는 **mutable** 키워드를 이용하면 된다.
- 기능적으로 똑같은 상수 멤버함수와 비상수 멤버함수가 있을때 비상수 버전의 함수가 상수 버전의 함수를 호출하면 된다.

  ```c++
  class TextBlock {
    public:
    const char& operator[] (std::size_t position) const {
      // ...
      return text[position];
    }

    char& operator[] (std::size_t position) {
      return const_cast<char&>(
        static_cast<const TextBlock&>(*this) [position]
      );
    }
  }
  ```

## 항목 4. 객체를 사용하기 전에 반드시 그 객체를 초기화 하자

- 생성자에서 데이터 멤버에 대한 대입문을 쓰지 말고 멤버 초기화 리스트를 이용하여 초기화하자.  
(이미 초기화 된후 생성자에서 값을 넣어 주는 것이다.)
- 클래스에 선언된 데이터 멤버 순서와 같이 초기화를 해야함 (선언된 순서로 초기화됨)
- 비지역 정적 객체의 초기화로 문제가 될수 있으니 지역 정적 객체로 바꾸어 싱글톤 방식으로 초기화하여 사용할 수 있도록 하자  
(비지역 정적 객체: 함수 내에 있는 정적 객체를 제외한 정적 객체)

<br><br>

# 2장. 생성자, 소멸자 및 대입 연산자

## 항목 5. c++가 은근슬쩍 만들어 호출해 버리는 함수들에 촉각을 세우자

- 아래 멤버들에 대해서 컴파일러가 필요하면 자동으로 만든다.

  ```c++
  class Empty {
    public:
      Empty() {...}  // 기본 생성자
      Empty(const Empty& rhs) {...}  // 복사 생성자
      ~Empty() {...}  // 소멸자

      Empty& operator=(const Empty& rhs) {...}  // 복사 대입 연산자

      // c++ 11에서는 무브 생성자, 무브 대입 연산자가 추가로 생성됨.
  };
  ```

## 항목 6. 컴파일러가 만들어낸 함수가 필요없으면 확실히 이들의 사용을 금해버리자

- 기본으로 생성하는 멤버 함수중 필요없는 함수를 private로 선언 한 후 구현하지 않은 채로 두면 된다.

  ```c++
  class Uncopyable {
    protected:
      Uncopyable() {} // 생성자 허용
      ~Uncopyable() {} // 소멸자 허용
    private:
      Uncopyable(const Uncopyable&); // 복사 생성자 허용 x
      Uncopyable& operator=(const Uncopyable&); // 복사 대입 연산자 허용 x
  };
  ```

- [noncopyable 클래스](https://www.boost.org/doc/libs/1_77_0/libs/core/doc/html/core/noncopyable.html#core.noncopyable.header_boost_core_noncopyable_hp)

## 항목 7. 다형성을 가진 기본 클래스에서는 소멸자를 반드시 가상 소멸자로 선언하자

- 다형성을 가진 기본 클래스에는 반드시 가상 소멸자를 선언해야한다. (부모 포인터로 자식의 데이터가 변경될 수 있다는 의미이므로 부모 포인터로 소멸자가 불릴때 소멸자에서 메모리를 제대로 해제하지 않을 수 있기 때문에)
- 즉, **어떤 클래스가 가상 함수를 하나라도 갖고 있으면, 이 클래스의 소멸자도 가상 소멸자로 해야함.**
- 다형성을 갖도록 설계하지 않았다면 가상 소멸자를 선언하지 말자.

## 항목 8. 예외가 소멸자를 떠나지 못하도록 붙들어 놓자

- 기본적으로 소멸자에서 예외가 나가면 안된다. 왜냐하면 예외가 발생하여 메모리 릭이 발생할 수 있기 때문이다.
- 만약 소멸자에서 호출된 함수가 예외를 던질 가능성이 있다면, 어떤 예외든지 소멸자에서 모두 받아 무시하던지, 프로그램을 끝내야 한다.
- 어떤 클래스의 연산이 진행되다 던진 예외에 대해서 처리해야 한다면 소멸자가 아닌 다른 함수를 만들어서 처리하도록 하자.

## 항목 9. 객체 생성 및 소멸 과정 중에는 절대로 가상 함수를 호출하지 말자

- 객체를 생성할 때는 부모 생성자 -> 자식 생성자 순으로 호출된다.
- 객체의 소멸의 역순으로 자식 소멸자 -> 부모 소멸자 순으로 호출된다.
- 부모 생성자에서 가상 함수를 호출하면 자식 클래스가 인스턴스 되지 않았기 때문에 부모의 가상 함수가 호출된다.
- 소멸자 또한 부모 소멸자에서 가상함수를 호출하면 자식이 이미 소멸되어 부모의 가상 함수가 호출된다.
- 따라서 의도와 다른 동작이 발생하므로 생성자, 소멸자에서 가상함수를 사용하지 말아야한다.

## 항목 10. 대입 연산자는 *this의 참조자를 반환하게 하자

- 대입 연산자를 구현한다는 것의 의도는 c++에서 대입 연산에 대한 문법을 구현한다는 의미이다.
- 그러므로  `x = y = z = 15;` 같은 문법도 지원한다는 의미이므로 아래처럼 대입 연산자에서 *this를 반환하는 것이 좋다.

  ```c++
  class Widget {
    public:
    Widget& operator=(const Widget& rhs) {
      //...
      return *this;
    }
  };
  ```

## 항목 11. operator=에서는 자기대입에 대한 처리가 빠지지 않도록 하자

- 자기 대입의 가능성이 있는 코드: `a[i] = [j];`, `*px = *py;`
- 자기 대입으로 인해 이미 해제한 메모리를 접근하는 등의 문제를 발생시킬 수 있다.
- 처리 예시

  ```c++
  Widget& Widget::operator= (const Widget& rhs) {
    Bitmap *pOrig = pb;
    pb = new Bitmap(*rhs.pb);
    delete pOrig;

    return *this;
  }
  ```

## 항목 12. 객체의 모든 부분을 빠짐없이 복사하자

- 복사생성자, 복사 대입 연산자는 주어진 객체의 모든 데이터 멤버를 복사 하도록 하자. **특히 데이터 멤버를 추가할때 빼먹지말도록!!**
- 상속된 경우 부모 클래스의 복사 생성자 혹은 대입연산자 함수를 호출해주도록 하자

  ```c++
  Child::Parent (const Child& rhs)
  : Parent(rhs), // 부모의 복사 생성자를 호출함!!
    data(rhs.data)
  {
    // ...
  }

  Child& Child::operator= (const Child& rhs) {
    // ...
    Parent::operator=(rhs); // 부모의 복사대입 연산자 호출함!!
    data = rhs.data;

    return *this;
  }
  ```
