/**
 * jkmoon
 * 원무 보험 정보 컴포넌트
 */
import React from 'react';
import { Col, Row } from 'reactstrap';

// 환자 id를 props로 받아서 사용
export interface IInsuranceInfoComponentProps {
  kemrPatientId: string;
}

export const InsuranceInfoComponent = (props: IInsuranceInfoComponentProps) => {

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <Row>
            <Col md="12">
              <dl className="jh-entity-details">
                <dt>
                  <span id="id">보험 가입자명</span>
                </dt>
                <dd></dd>
                <dt>
                  <span id="id">보험 가입자<br />주민등록번호</span>
                </dt>
                <dd></dd>
              </dl>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default InsuranceInfoComponent;
