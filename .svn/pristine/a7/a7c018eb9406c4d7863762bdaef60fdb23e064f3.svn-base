import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrPatient from './kemr-patient';
import KemrPatientDetail from './kemr-patient-detail';
import KemrPatientUpdate from './kemr-patient-update';
import KemrPatientDeleteDialog from './kemr-patient-delete-dialog';

const KemrPatientRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrPatient />} />
    <Route path="new" element={<KemrPatientUpdate />} />
    <Route path=":id">
      <Route index element={<KemrPatientDetail />} />
      <Route path="edit" element={<KemrPatientUpdate />} />
      <Route path="delete" element={<KemrPatientDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrPatientRoutes;
