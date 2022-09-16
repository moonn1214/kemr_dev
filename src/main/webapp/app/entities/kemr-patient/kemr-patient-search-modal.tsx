import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Table, Input } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Translate, TextFormat } from 'react-jhipster';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import axios from 'axios';
import KemrPatient from './kemr-patient';
import { isNull } from 'lodash';
//props -> setdata /getdata
const ModalLink = ({ setData, getData }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const kemrPatientList = useAppSelector(state => state.kemrPatient.entities);
  const loading = useAppSelector(state => state.kemrPatient.loading);
  //이름 검색으로 조회 usestate
  const [query, setQuery] = useState('');
  const searchKeys = ['kemrPatientCellphone', 'kemrPatientName', 'kemrPatientSocialSeurityNo'];
  //checkbox 데이터 값 받기
  const [checkboxs, setCheckboxs] = useState(true);

  const handleChange = data => {
    setCheckboxs(data);
  };

  //어떻게 해야 하나만 남는지 모르겠음 -> checked 속성이 없음
  const checkOnlyOne = checkthis => {
    const checkboxall = document.getElementsByName('FormCheckInput');

    for (let i = 0; i < checkboxall.length; i++) {
      if (checkboxall[i] !== checkthis) {
        for (let j = 0; j < checkboxall.length; j++) {
          checkboxall[j];
        }
      }
    }
  };
  //checkbox 미선택시 상태 유지
  const ifNotCheck = checkbox => {
    if (checkbox === true) {
      stop();
    } else {
      toggle();
      checkbox = null;
    }
  };

  return (
    <div>
      <Button
        className="me-2"
        color="success"
        onClick={() => {
          toggle();
        }}
        style={{ height: '45px' }}
      >
        <FontAwesomeIcon icon="users" />
        &nbsp;환자조회
      </Button>
      <Modal size="xl" isOpen={modal} toggle={toggle}>
        <ModalHeader>
          환자조회
          <Input
            id="searchB"
            placeholder="Search..."
            style={{ position: 'relative', left: '430%' }}
            onChange={e => {
              setQuery(e.target.value);
            }}
          ></Input>
        </ModalHeader>
        <ModalBody style={{ height: '75vh' }}>
          <div className="table-responsive">
            {kemrPatientList && kemrPatientList.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>선택</th>
                    <th>환자 번호</th>
                    <th>환자 이름</th>
                    <th>환자 성별(M/F)</th>
                    <th>환자 생년월일</th>
                    {/* <th>환자 가입일자</th> */}
                    <th>환자 주민등록번호</th>
                    <th>환자 자격조회</th>
                    {/* 공단자격조회결과(지역가입자:1, 지역세대원:2, 임의계속직장가입자:3, 직장가입자:4, 직장피부양자:5, 의료급여1종:6, 의료급여2종:7) */}
                    {/* <th>환자 주소</th> */}
                    {/* <th>환자 중요 기록</th> */}
                    <th>환자 휴대폰 번호</th>
                    {/* <th>환자 유선전화 번호</th> */}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {kemrPatientList
                    .filter(
                      kemrPatient => searchKeys.some(key => kemrPatient[key].includes(getData))
                      // kemrPatient.kemrPatientCellphone.includes(query) ||
                      // kemrPatient.kemrPatientName.includes(query) ||
                      // kemrPatient.kemrPatientSocialSeurityNo.includes(query)
                    )
                    .filter(kemrPatient => searchKeys.some(key => kemrPatient[key].includes(query)))
                    .map((kemrPatient, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>
                          {/* 환자 정보 체크박스 */}
                          <FormCheckInput
                            name="FormCheckInput"
                            onChange={e => {
                              handleChange(kemrPatient.kemrPatientBirthday);
                              //환자 생일자 값 -> kemr-patient 창에 넘겨 줌
                              // checkOnlyOne(e.target);
                            }}
                            onClick={e => {
                              checkOnlyOne(e.target);
                            }}
                          ></FormCheckInput>
                          {/* <input type="checkbox" value={kemrPatient.id} />
                          First */}
                        </td>
                        <td>
                          <Button tag={Link} to={`/kemr-patient/${kemrPatient.id}`} color="link" size="sm">
                            {kemrPatient.id}
                          </Button>
                        </td>
                        <td>{kemrPatient.kemrPatientName}</td>
                        <td>{kemrPatient.kemrPatientSex}</td>
                        <td>
                          {kemrPatient.kemrPatientBirthday ? (
                            <TextFormat type="date" value={kemrPatient.kemrPatientBirthday} format={APP_LOCAL_DATE_FORMAT} />
                          ) : null}
                        </td>
                        {/* <td>
                        {kemrPatient.kemrPatientRegistrationDate ? (
                          <TextFormat type="date" value={kemrPatient.kemrPatientRegistrationDate} format={APP_DATE_FORMAT} />
                        ) : null}
                      </td> */}
                        <td>{kemrPatient.kemrPatientSocialSeurityNo}</td>
                        <td>{kemrPatient.kemrPatientQualificationCheck}</td>
                        {/* <td>{kemrPatient.kemrPatientAddress}</td> */}
                        {/* <td>{kemrPatient.kemrPatientNurseMemo}</td> */}
                        <td>{kemrPatient.kemrPatientCellphone}</td>

                        {/* <td>{kemrPatient.kemrPatientLandline}</td> */}
                        {/* <td className="text-end">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`/kemr-patient/${kemrPatient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                            <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/kemr-patient/${kemrPatient.id}/edit`}
                            color="primary"
                            size="sm"
                            data-cy="entityEditButton"
                          >
                            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">수정</span>
                          </Button>
                          <Button
                            tag={Link}
                            to={`/kemr-patient/${kemrPatient.id}/delete`}
                            color="danger"
                            size="sm"
                            data-cy="entityDeleteButton"
                          >
                            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">삭제</span>
                          </Button>
                        </div>
                      </td> */}
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              !loading && <div className="alert alert-warning">No Kemr Patients found</div>
            )}
          </div>
          {/* <iframe
            style={{ height: '100%', width: '100%', borderStyle: 'none', borderRadius: '10px' }}
            src="http://localhost:9000/kemr-patient/search"
          /> */}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="success" onClick={toggle}>
            종료{''}
          </Button> */}
          <Button
            color="success"
            onClick={() => {
              ifNotCheck(checkboxs);
              setData(checkboxs);
            }}
          >
            선택완료
          </Button>
          <Link to="/kemr-patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; 환자정보등록
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalLink;
