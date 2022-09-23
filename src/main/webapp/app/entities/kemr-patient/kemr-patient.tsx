import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table, Modal, Input } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IKemrPatient } from 'app/shared/model/kemr-patient.model';
import { getEntities } from './kemr-patient.reducer';
import ModalLink from './kemr-patient-search-modal';
import { size } from 'lodash';

export const KemrPatient = props => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const kemrPatientList = useAppSelector(state => state.kemrPatient.entities);
  const loading = useAppSelector(state => state.kemrPatient.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };
  const [id, setId] = useState(0);
  const [data, setData] = useState('');
  const searchKeys = ['kemrPatientCellphone', 'kemrPatientName', 'kemrPatientSocialSeurityNo', 'kemrPatientBirthday'];
  const [query, setQuery] = useState('');
  const [parentdata, getData] = useState('');
  const [search, setSearch] = useState('');

  const handelChange = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="searchbar-area"></div>
      <h2 id="kemr-patient-heading" data-cy="KemrPatientHeading">
        환자정보
        <div className="d-flex justify-content-end">
          {/* <Input
            placeholder="이름 검색..."
            style={{ position: 'relative', width: '400px', height: '44px', marginRight: '10px' }}
            onChange={handelChange}
          ></Input>*/}
          {/* 회원조회_버튼 */}

          {/* <ModalLink setData={setData} getData={search}></ModalLink>  */}

          {/* <Button onSubmit={handleSubmit}>Submit</Button> */}

          {/* <Button className="me-2" color="success " tag={Link} to={`/kemr-patient/search`} size="sm">
            <FontAwesomeIcon icon="users" />
            &nbsp; 환자 조회
          </Button> */}

          {/* <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> 새로고침
          </Button> */}

          {/* <Link to="/kemr-patient/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; 환자정보등록
          </Link> */}
        </div>
      </h2>
      <div className="kemrPaient-main-body"></div>
      <div className="table-responsive">
        {kemrPatientList && kemrPatientList.length > 0 ? (
          <Table responsive>
            {/* <thead>
              <tr>
                <th>환자 번호</th>
                <th>환자 이름</th>
                <th>환자 성별</th>
                <th>환자 생년월일</th>
                <th>환자 가입일자</th>
                <th>환자 주민등록번호</th>
                <th>환자 자격조회</th>
                <th>환자 주소</th>
                <th>환자 중요 기록</th>
                <th>환자 휴대폰 번호</th>
                <th>환자 유선전화 번호</th>
                <th />
              </tr>
            </thead> */}
            {/* <tbody> */}
            {kemrPatientList
              .filter(
                kemrPatient => searchKeys.some(key => kemrPatient[key].includes(data))
                // kemrPatient.kemrPatientCellphone.includes(query) ||
                // kemrPatient.kemrPatientName.includes(query) ||
                // kemrPatient.kemrPatientSocialSeurityNo.includes(query)
              )
              .map((kemrPatient, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
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
                  <td>
                    {kemrPatient.kemrPatientRegistrationDate ? (
                      <TextFormat type="date" value={kemrPatient.kemrPatientRegistrationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{kemrPatient.kemrPatientSocialSeurityNo}</td>
                  <td>{kemrPatient.kemrPatientQualificationCheck}</td>
                  <td>{kemrPatient.kemrPatientAddress}</td>
                  <td>{kemrPatient.kemrPatientNurseMemo}</td>
                  <td>{kemrPatient.kemrPatientCellphone}</td>
                  <td>{kemrPatient.kemrPatientLandline}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/kemr-patient/${kemrPatient.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">보기</span>
                      </Button>
                      <Button tag={Link} to={`/kemr-patient/${kemrPatient.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
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
                  </td>
                </tr>
              ))}
            {/* </tbody> */}
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Kemr Patients found</div>
        )}
      </div>
    </div>
  );
};

export default KemrPatient;
