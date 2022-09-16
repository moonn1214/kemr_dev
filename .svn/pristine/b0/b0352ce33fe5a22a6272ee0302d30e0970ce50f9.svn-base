import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrInstitution from './kemr-institution';
import KemrPatient from './kemr-patient';
import KemrMedicalTreatment from './kemr-medical-treatment';
import KemrMedicalBill from './kemr-medical-bill';
import KemrPrescription from './kemr-prescription';
import KemrMedicine from './kemr-medicine';
import KemrDoctor from './kemr-doctor';
import KemrDiagnosis from './kemr-diagnosis';
import KemrTreatment from './kemr-treatment';
import KemrReservation from './kemr-reservation';
import Sidebar from 'app/shared/layout/sidebar/sidebar';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="kemr-institution/*" element={<KemrInstitution />} />
        <Route path="kemr-patient/*" element={<KemrPatient />} />
        <Route path="kemr-medical-treatment/*" element={<KemrMedicalTreatment />} />
        <Route path="kemr-medical-bill/*" element={<KemrMedicalBill />} />
        <Route path="kemr-prescription/*" element={<KemrPrescription />} />
        <Route path="kemr-medicine/*" element={<KemrMedicine />} />
        <Route path="kemr-doctor/*" element={<KemrDoctor />} />
        <Route path="kemr-diagnosis/*" element={<KemrDiagnosis />} />
        <Route path="kemr-treatment/*" element={<KemrTreatment />} />
        <Route path="kemr-reservation/*" element={<KemrReservation />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
