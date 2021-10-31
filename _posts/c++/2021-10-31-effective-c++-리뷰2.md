---
title: Effective C++ 리뷰 (3장 ~ 4장)
slug: effective-cpp-review2
excerpt: Effective C++의 3장 ~ 4장을 읽고 요약했다.
date: '2021-10-31T08:21:58.004Z'
last_modified_at: '2021-10-31T09:46:00.572Z'
draft: true
tags:
  - C++
  - Effective C++
categories:
  - C++
  - Effective C++
---

## 3장. 자원 관리

### 항목 13. 자원 관리에는 객체가 그만

- 자원 누출을 막기 위해, 생성자 안에서 자원을 획득하고 소멸자에서 자원을 해제하는 RAII 객체(raii 디자인 패턴 참고)를 사용하자

```c++
  // 이렇게 하면 pInv의 자원이 해제되지 않을 가능성이 있음
  // 함수 중간에 리턴을 하거나 예외가 발생하는 등...
  void f() {
    Investment *pInv = createInvestment();
    /* ... */
    delete pInv;
  }

  // 이때 RAII(std::auto_ptr 혹은 std::tr1::shared_ptr)를 사용하여 객체의 소멸자에서 자원이 해제 될수 있도록 한다.
  void f() {
    // 유일한 소유권을 갖는 다고 가정함
    std::auto_ptr<Investment> pInv(createInvestment());
    
    std::auto_ptr<Investment> pInv2(pInv1); // pInv1이 null이 됨
  }
  void f() {
    // ref count로 관리하는 방식
    std::tr1::shared_ptr<Investment> pInv(createInvestment());
    
    std::tr1::shared_ptr<Investment> pInv2(pInv1); // pInv1 pInv2 둘다 같은 객체를 가리킴
  }
```

### 항목 14. 자원 관리 클래스의 복사 동작에 대해 진지하게 고찰하자

- RAII 객체의 복사는 그 객체가 관리하는 자원의 복사 문제를 안고 가기 때문에, 복사할때 자원을 어떻게 처리할지는 RAII 객체의 복사 동작에 따라 달라진다.

```c++
  class Lock {
    public:
    explicit Lock(Mutex *pm) : mutexPtr(pm) {
      lock(mutexPtr);
    }
    ~Lock() { unlock(mutexPtr); }

    private:
    Mutex *mutexPtr;
  }
  
  Mutex m;
  ... 
  {
    Lock ml1(&m);
    Lock ml2(ml1); // RAII 객체를 복사하여 생성함, 이때 동작을 정해야함.
  }
```

- RAII 객체의 복사를 할때 취해야할 동작
  1. 복사를 금지한다.  예를들어 Uncopyable 클래스를 상속받는 방법이 있다.
  1. 관리하고 있는 자원에 대해 참조 카운팅을 1씩 증가시켜 준다. 이후 객체가 소멸될때 참조 카운트를 1씩 감소시켜 참조카운트가 0 이 되었을때 자원을 해제하도록 만든다.  
   *Lock클래스 처럼 자원의 해제가 메모리 해제가 아닐 경우 std::tr1::shared_ptr는 삭제자를 지정하여 생성할 수 있다.*  
   > 참고  
   > [shared_ptr의 삭제자](https://en.cppreference.com/w/cpp/memory/shared_ptr/shared_ptr)  
   > [shared_ptr의 삭제자 사용법](https://blog.koriel.kr/cpp11-smart-pointer/)
  1. 관리하고 있는 자원을 진짜로 복사한다.  예를 들어 표준 string 클래스가 있다.
  1. 관리하고 있는 자원의 소유권을 옮긴다.  예를 들어 unique_ptr 이 있다.
