리액트란?
  facebook에서 제공해주는 프로트엔드 라이브러리
  싱글 페이지 앱이나 모바일 앱 개발에 이용 가능

  굳이 리액트를 이용하지 않아도 html, css, js를 이용해 웹페이지를 작성 가능
  But, 이용자와 상호작용 가능한 동적 UI제작이 쉽기에 사용

특징
  Data Flow
  단방향으로 흐르는 flow를 가짐
  Component 기반 구조
  여러 UI를 컴포넌트로 쪼개서 제작
  독립된 컴포넌트들을 조립해서 화면 구성
  => 전체 코드 파악이 쉬움, 코드 재사용성 높음, 유지보수 쉬움

  Virtual DOM
    이벤트 발생마다 새로 DOM을 렌더링할 필요 없이
    Virtual DOM에서 실제 DOM과 차이나는 부분만 변경
    => 효율성 속도 개선

  Props, State
    Props
      부모 컴포넌트에서 자식 컴포넌트로 전달하는 객체
      자식은 전달받은 컴포넌트르 변경 불가능, 최상위 부모만이 수정 가능
      <Message 
              messages={messages}
              current={current}
      />

    State
      컴포넌트 내부에서 선언, 내부에서 값 변경 가능
      동적인 데이터 조작시 사용
      클래스형 컴포넌트에서만 사용 가능하고, 독립적
      state = {
        message: '',
        member: ''
      }

  JSX
    자바스크립트를 확장한 문법
    JS에 마크업을 넣어서 관리 가능

Component
  Class
    Functional보다 많은 기능 제공
    길고 복잡하고 느린 코드
  
  Functional
    기능은 적지만 짧고 간단하고 빠른 코드




리덕스란?
  State 관리 라이브러리
  Props 대신 State를 사용해서 관리

Data Flow
  Component -Dispatch-> Action -> Reducer -> Store -Subscribe-> Component
  단방향 플로우를 가짐

Action
  이벤트를 설명하는 객체
  type필드를 필수적으로 가짐

Action Creater
  액션을 생성해주는 함수
  단순하게 파라미터를 받아와 액션 객체로 만듦

Reducer
  변화를 일으키는 함수
  현재 상태와 액션을 전달받아 새로운 상태를 리턴
  여러 개의 리듀서를 만들고 루트 리듀서로 합쳐서 관리

Store
  앱의 전체적인 현재 상태, 내장 함수(state 관리), 리듀서를 포함
