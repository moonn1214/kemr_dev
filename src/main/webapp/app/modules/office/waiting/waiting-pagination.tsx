/**
 * jkmoon
 * 원무- 대기 항목 및 쪽수 컴포넌트
 */
 import React, { useState } from 'react';
 import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
 
 export interface IWaitingPaginationComponentProps {
   waitingNo: string;
   itemList: any;
 }
 
//  수정: 가운데 정렬 어떻게 하는지 모르겠음, 예외적인 경우 있는지 확인해야 함
 export const WaitingPaginationComponent = (props: IWaitingPaginationComponentProps) => {
   // 쪽수 1개 당 최대 항목 수
   const maxItemNo = 2;
   // 한번에 표시 가능한 최대 쪽수 번호 개수
   const maxPaginationNo = 5;
   // 현재 표시되어야 할 쪽수 번호 개수
   const currentPaginationNo = Math.ceil(Number(props.waitingNo) / maxItemNo);
   // pagination 렌더링 반환 값
   const paginationArray = [];
   // 현재 활성화된 쪽수
   const [activatedPagination, setActivatedPagination] = useState(1);
   // 쪽수 1개 당 표시되는 항목 렌더링 반환 값
   const itemArray = [];
 
   return (
     <div>
       <Row className="justify-content-center">
         <Col md="12">
           {/* 대기 컴포넌트 쪽수에 대한 항목 */}
           {(() => {
             const startItemIndex = maxItemNo * (activatedPagination - 1);
             itemArray.splice(0);
             for (let i = 1; i <= maxItemNo; i++) {
               if ((startItemIndex + i) <= props.itemList.length) {
                 itemArray.push(props.itemList[(startItemIndex + (i - 1))]);
               }
             }
             return itemArray;
           })()}
           {/* 대기 컴포넌트 쪽수 */}
           &nbsp;
           {currentPaginationNo > 0 ? (
             <Pagination size="sm">
               {activatedPagination === 1 ? (
                 <PaginationItem disabled>
                   <PaginationLink previous />
                 </PaginationItem>
               ) : (
                 <PaginationItem onClick={() => setActivatedPagination(activatedPagination - 1)}>
                   <PaginationLink previous />
                 </PaginationItem>
               )}
               {(() => {
                 if (maxPaginationNo >= currentPaginationNo) {
                   for (let i = 1; i <= currentPaginationNo; i++) {
                     paginationArray.push(
                       activatedPagination === i ? (
                         <PaginationItem active key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       ) : (
                         <PaginationItem onClick={() => setActivatedPagination(i)} key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       )
                     );
                   }
                 } 
                 else if (maxPaginationNo < currentPaginationNo && activatedPagination <= maxPaginationNo) {
                   for (let i = 1; i <= maxPaginationNo; i++) {
                     paginationArray.push(
                       activatedPagination === i ? (
                         <PaginationItem active key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       ) : (
                         <PaginationItem onClick={() => setActivatedPagination(i)} key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       )
                     );
                   }
                 }
                 else if (maxPaginationNo < currentPaginationNo && activatedPagination > maxPaginationNo) {
                   for (let i = activatedPagination; i <= (activatedPagination + (maxPaginationNo - 1)); i++) {
                     paginationArray.push(
                       activatedPagination === i ? (
                         <PaginationItem active key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       ) : (
                         <PaginationItem onClick={() => setActivatedPagination(i)} key={i}>
                           <PaginationLink>
                             {i}
                           </PaginationLink>
                         </PaginationItem>
                       )
                     );
                     if (i === currentPaginationNo) break;
                   }
                 }
                 return paginationArray;
               })()}
               {activatedPagination !== currentPaginationNo ? (
                 <PaginationItem onClick={() => setActivatedPagination(activatedPagination + 1)} >
                   <PaginationLink next />
                 </PaginationItem>
               ) : (
                 <PaginationItem disabled>
                   <PaginationLink next />
                 </PaginationItem>
               )}
             </Pagination>
           ) : (
             <Pagination size="sm">
               <PaginationItem disabled>
                 <PaginationLink previous />
               </PaginationItem>
               <PaginationItem active>
                 <PaginationLink>
                   1
                 </PaginationLink>
               </PaginationItem>
               <PaginationItem disabled>
                 <PaginationLink next />
               </PaginationItem>
             </Pagination>
           )}
         </Col>
       </Row>
     </div>
   );
 };
 
 export default WaitingPaginationComponent;
 