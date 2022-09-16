import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrDiagnosis from './kemr-diagnosis';
import KemrDiagnosisDetail from './kemr-diagnosis-detail';
import KemrDiagnosisUpdate from './kemr-diagnosis-update';
import KemrDiagnosisDeleteDialog from './kemr-diagnosis-delete-dialog';

const KemrDiagnosisRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrDiagnosis />} />
    <Route path="new" element={<KemrDiagnosisUpdate />} />
    <Route path=":id">
      <Route index element={<KemrDiagnosisDetail />} />
      <Route path="edit" element={<KemrDiagnosisUpdate />} />
      <Route path="delete" element={<KemrDiagnosisDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrDiagnosisRoutes;
