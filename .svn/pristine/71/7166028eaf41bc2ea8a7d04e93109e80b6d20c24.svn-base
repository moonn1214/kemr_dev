import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrPrescription from './kemr-prescription';
import KemrPrescriptionDetail from './kemr-prescription-detail';
import KemrPrescriptionUpdate from './kemr-prescription-update';
import KemrPrescriptionDeleteDialog from './kemr-prescription-delete-dialog';

const KemrPrescriptionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrPrescription />} />
    <Route path="new" element={<KemrPrescriptionUpdate />} />
    <Route path=":id">
      <Route index element={<KemrPrescriptionDetail />} />
      <Route path="edit" element={<KemrPrescriptionUpdate />} />
      <Route path="delete" element={<KemrPrescriptionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrPrescriptionRoutes;
