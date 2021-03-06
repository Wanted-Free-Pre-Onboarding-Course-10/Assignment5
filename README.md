# Assignment5
원티드 X 위코드 프리 온보딩 2주차 기업형 과제(휴먼스케이프)

## 설명

본 프로젝트는 원티드x위코드 백엔드 프리온보딩  [휴먼스케이프](https://www.notion.so/wecode/087d474586cb45b8a981a5ab4931b9f3)에서 출제한 과제를 기반으로 제작 되었습니다.

 <details>

 
<summary> 과제 요구사항  </summary>

- 임상정보를 수집하는 batch task
- 수집한 임상정보에 대한 API
- 특정 임상정보 읽기(키 값은 자유)
- 수집한 임상정보 리스트 API
- 최근 일주일내에 업데이트(변경사항이 있는) 된 임상정보 리스트
- pagination 기능
- Test 구현시 가산점이 있습니다.


</details>



 <details>

<summary> 필수 포함 사항 </summary>

- READ.ME 작성
 
- 프로젝트 빌드, 자세한 실행 방법 명시
 
- 구현 방법과 이유에 대한 간략한 설명
 
- 완료된 시스템이 배포된 서버의 주소
 
- Swagger나 Postman을 통한 API 테스트할때 필요한 상세 방법 및  테스트 가능하도록 구현
 
- 해당 과제를 진행하면서 회고 내용 블로그 포스팅
 
</details>


 <details>

<summary> 확인 사항 </summary>
 
- 데이터베이스는 SQLite로 구현 및 ORM 사용 필수
 
- secret key, api key 등을 레포지토리에 올리지 않도록 유의
 
- README.md 에 관련 설명 명시 필요
 
</details>


 <details>

<summary> 도전 과제 </summary>

- 배포하여 웹에서 사용 할 수 있도록 제공
 
- 임상정보 검색 API 제공
 
</details>



## 개발 일정
<img src="https://user-images.githubusercontent.com/48669085/142020616-a3e8876d-72cf-4684-ae41-61d671b39c3b.png" height="350px" width="400px" />

## 코드 컨벤션
[코드 컨벤션](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment4/wiki/%EC%BD%94%EB%93%9C%EC%BB%A8%EB%B2%A4%EC%85%98)

## 시나리오 및 시퀀스 정의
![image](https://user-images.githubusercontent.com/48669085/142013394-288aa47e-b9ee-4369-a209-40e3f5ad675c.png)



## 과제 구현사항

| 구현사항  | 구현 여부                                          |
|------- | ----------------------------------------------- |
|임상정보를 수집하는 batch task|  OK| 
|수집한 임상정보에 대한 API|OK |
|특정 임상정보 읽기(키 값은 자유)| OK | 
|수집한 임상정보 리스트 API| OK | 
|최근 일주일내에 업데이트(변경사항이 있는) 된 임상정보 리스트 | OK | 
|pagination 기능| OK | 



## 사용 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/TYPEORM-red?style=for-the-badge&logo=TYPEORM&logoColor=white" />

## DB 스키마
<img src="https://user-images.githubusercontent.com/48669085/142012766-940e2615-8625-4f73-b19a-61f7d7ce9b1c.png" height="300px" width="600px" />

## API
[API문서](https://documenter.getpostman.com/view/13568025/UVCB9Pbm)

## API 테스트
1. 우측 링크를 클릭해서 postman으로 들어갑니다.[링크](https://www.postman.com/martian-satellite-348039/workspace/humanscape/overview) 
2. 정의된 server가 올바른지 확인 합니다.(3.35.220.172:3000)
<img width="1048" alt="스크린샷 2021-11-17 오전 3 02 20" src="https://user-images.githubusercontent.com/81801012/142041687-0ecf274f-99e8-48df-aec7-77f0929de1c7.png">

3. 이후, API 테스트를 시도해 주세요.

## 설치 및 실행 방법

### 프로젝트 설치

```
git clone https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5.git

.env파일 존재해야 실행가능합니다.

```

 ### 환경 구축 및 
```
npm install

npm run start:dev
```

## 팀원

| 이름   | github                                          | 담당 역할                  | 회고록             |
| ------ | ----------------------------------------------- | -------------------------- |------------------|
| 박지율 | [earthkingman](https://github.com/earthkingman) |  수집한 임상정보 리스트 API, 최근 일주일내에 업데이트(변경사항이 있는) 된 임상정보 리스트   |            |
| 염재선 | [Yeom Jae Seon](https://github.com/YeomJaeSeon) | 수집한 임상정보에 검색 API, 특정 임상정보 읽기(키 값은 자유) |[회고록](https://yjs3819.tistory.com/71)|
| 김태희 | [김태희](https://github.com/godtaehee)           |    임상정보를 수집하는 batch task   |             |
| 박상엽 | [큰형](  https://github.com/lotus0204)           |   임상정보를 수집하는 batch task   |                   |


## 협업 방식

[잡초 협업하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment2/wiki/%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)

## 개발 과정

- [임상 정보 리스트](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5/wiki/%EC%9E%84%EC%83%81%EC%A0%95%EB%B3%B4-%EB%A6%AC%EC%8A%A4%ED%8A%B8)
- [변경사항이 있는 정보 DB에 업데이트하기](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5/wiki/%EB%B3%80%EA%B2%BD%EC%82%AC%ED%95%AD%EC%9D%B4-%EC%9E%88%EB%8A%94-%EC%A0%95%EB%B3%B4-DB%EC%97%90-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%ED%95%98%EA%B8%B0)
- [임상 정보 검색기능](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5/wiki/%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5)
- [임상연구의 새로운 데이터가 추가되거나 기존 임상연구의 데이터가 변경되었을때의 대응](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5/wiki/%EC%9E%84%EC%83%81%EC%97%B0%EA%B5%AC%EC%9D%98-%EC%83%88%EB%A1%9C%EC%9A%B4-%EB%8D%B0%EC%9D%B4%ED%84%B0%EA%B0%80-%EC%B6%94%EA%B0%80%EB%90%98%EA%B1%B0%EB%82%98-%EA%B8%B0%EC%A1%B4-%EC%9E%84%EC%83%81%EC%97%B0%EA%B5%AC%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EA%B0%80-%EB%B3%80%EA%B2%BD%EB%90%98%EC%97%88%EC%9D%84%EB%95%8C%EC%9D%98-%EB%8C%80%EC%9D%91)
- [임상연구 데이터 업데이트시 트랜잭션처리](https://github.com/Wanted-Free-Pre-Onboarding-Course-10/Assignment5/wiki/%EC%9E%84%EC%83%81%EC%97%B0%EA%B5%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EC%8B%9C-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EC%B2%98%EB%A6%AC)
