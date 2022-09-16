import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrMedicalTreatment from './kemr-medical-treatment';
import KemrMedicalTreatmentDetail from './kemr-medical-treatment-detail';
import KemrMedicalTreatmentUpdate from './kemr-medical-treatment-update';
import KemrMedicalTreatmentDeleteDialog from './kemr-medical-treatment-delete-dialog';

const KemrMedicalTreatmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrMedicalTreatment />} />
    <Route path="new" element={<KemrMedicalTreatmentUpdate />} />
    <Route path=":id">
      <Route index element={<KemrMedicalTreatmentDetail />} />
      <Route path="edit" element={<KemrMedicalTreatmentUpdate />} />
      <Route path="delete" element={<KemrMedicalTreatmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrMedicalTreatmentRoutes;
