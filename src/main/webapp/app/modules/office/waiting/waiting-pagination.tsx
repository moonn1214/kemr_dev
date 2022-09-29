/**
 * jkmoon
 * 원무 대기 항목 및 페이지네이션 컴포넌트
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export interface IWaitingPaginationComponentProps {
  itemList: any;
}

export const WaitingPaginationComponent = (props: IWaitingPaginationComponentProps) => {
  // 현재 활성화된 페이지
  const [activatedPagination, setActivatedPagination] = useState(1);
  
  // 페이지 1개 당 최대 항목 수 (5가 적절해보임, 메인 레이아웃 높이에 맞춰서 설정)
  const maxItemNo = 2;
  // 페이지마다 표시할 항목 리스트의 시작 인덱스 (0, 1, 2 ...)
  const itemStartIndex = maxItemNo * (activatedPagination - 1);
  // 페이지 1개 당 표시되는 항목 배열
  const itemArray = [];

  // 한번에 표시 가능한 최대 페이지 번호 (5가 적절해보임, 해당 레이아웃 넓이에 맞춰서 설정)
  const maxPaginationNo = 5;
  // 페이지네이션마다 표시할 페이지 번호의 시작 인덱스 (1, 2, 3 ...)
  const paginationStartIndex = (Math.ceil(activatedPagination / maxPaginationNo) - 1) * maxPaginationNo + 1;
  // 페이지네이션 1개 당 표시되는 페이지 번호 배열
  const paginationArray = [];
  
  // 현재 필요한 페이지 번호 수 (props로 받은 항목 수에 따라 초기화)
  const currentPaginationNo = Math.ceil(Number(props.itemList.length) / maxItemNo);

  // 선택한 페이지에 대해 표시할 항목 렌더링 메소드
  const renderItemArray = () => {
    // 항목 배열 비움
    itemArray.splice(0);
    // 페이지 1개 당 최대 항목 수 만큼 루프
    for (let i = 1; i <= maxItemNo; i++) {
      // 선택한 페이지에 표시할 항목 시작 인덱스가 props로 받은 항목 리스트 길이 이하일 때 실행
      if ((itemStartIndex + i) <= props.itemList.length) {
        // 표시할 항목 배열에 항목 추가
        itemArray.push(props.itemList[(itemStartIndex + (i - 1))]);
      }
    }
    // 항목 배열 반환
    return itemArray;
  };

  // 선택한 페이지에 대해 표시할 페이지네이션 렌더링 메소드
  const renderPaginationArray = () => {
    // 페이지 번호의 시작 인덱스부터 (페이지 번호 시작 인덱스 + 한번에 표시 가능한 최대 페이지 번호 - 1) 만큼 루프
    for (let i = paginationStartIndex; i <= (paginationStartIndex + (maxPaginationNo - 1)); i++) {
      paginationArray.push(
        activatedPagination === i ? (
          <PaginationItem key={`entity-${i}`} active>
            <PaginationLink>
              {i}
            </PaginationLink>
          </PaginationItem>
        ) : (
          <PaginationItem key={`entity-${i}`} onClick={() => setActivatedPagination(i)}>
            <PaginationLink>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      );
      // 루프 인덱스가 현재 필요한 페이지 번호 수에 도달하면 종료
      if (i === currentPaginationNo) break;
    }
    // 페이지 번호 배열 반환
    return paginationArray;
  };

  // 항목 삭제 또는 추가로 인해, 표시할 페이지 번호 수가 변경되면 현재 활성화 페이지 번호 1로 초기화
  useEffect(() => {
    setActivatedPagination(1);
  }, [currentPaginationNo]);

  return (
    <div >
      <div className="justify-content-center d-flex">
        <Row className="justify-content-center">
          <Col md="12">
            {/* 현재 활성화된 페이지에 표시될 항목 렌더링 후 반환하여 표시 */}
            {renderItemArray()}
          </Col>
        </Row>
      </div>
      &nbsp;
      <div className="justify-content-center d-flex">
        <Pagination size="sm">
          {/* 처음으로 버튼
              현재 활성화 페이지 번호가 1이면 처음으로 화살표 버튼 비활성화
              1이 아니면 현재 활성화 페이지 번호를 페이지 번호 1로 내리는 메소드를 onClick으로 설정 */}
          {activatedPagination === 1 ? (
            <PaginationItem disabled>
              <PaginationLink first />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => setActivatedPagination(1)}>
              <PaginationLink first />
            </PaginationItem>
          )}
          {/* 이전으로 버튼 
              현재 활성화 페이지 번호가 1이면 이전으로 화살표 버튼 비활성화
              1이 아니면 현재 활성화 페이지 번호를 1 내리는 메소드를 onClick으로 설정 */}
          {activatedPagination === 1 ? (
            <PaginationItem disabled>
              <PaginationLink previous />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => setActivatedPagination(activatedPagination - 1)}>
              <PaginationLink previous />
            </PaginationItem>
          )}

          {/* 현재 페이지 번호에 대한 페이지네이션 렌더링 후 반환하여 표시 */}
          {renderPaginationArray()}
          
          {/* 다음으로 버튼
              현재 활성화 페이지와 현재 필요한 페이지 번호 수가 같으면 다음으로 화살표 버튼 비활성화
              다르면 현재 활성화 페이지 번호를 1 올리는 메소드를 onClick으로 설정 */}
          {activatedPagination === currentPaginationNo ? (
            <PaginationItem disabled>
              <PaginationLink next />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => setActivatedPagination(activatedPagination + 1)}>
              <PaginationLink next />
            </PaginationItem>
          )}
          {/* 마지막으로 버튼
              현재 활성화된 페이지와 현재 필요한 페이지 번호 수가 같으면 마지막으로 화살표 버튼 비활성화
              다르면 현재 활성화 페이지 번호를 현재 필요한 페이지 번호 수로 올리는 메소드를 onClick으로 설정 */}
          {activatedPagination === currentPaginationNo ? (
            <PaginationItem disabled>
              <PaginationLink last />
            </PaginationItem>
          ) : (
            <PaginationItem onClick={() => setActivatedPagination(currentPaginationNo)}>
              <PaginationLink last />
            </PaginationItem>
          )}
        </Pagination>
      </div>
    </div>
  );
};

export default WaitingPaginationComponent;
 