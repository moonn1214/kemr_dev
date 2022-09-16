import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrTreatment from './kemr-treatment';
import KemrTreatmentDetail from './kemr-treatment-detail';
import KemrTreatmentUpdate from './kemr-treatment-update';
import KemrTreatmentDeleteDialog from './kemr-treatment-delete-dialog';

const KemrTreatmentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrTreatment />} />
    <Route path="new" element={<KemrTreatmentUpdate />} />
    <Route path=":id">
      <Route index element={<KemrTreatmentDetail />} />
      <Route path="edit" element={<KemrTreatmentUpdate />} />
      <Route path="delete" element={<KemrTreatmentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrTreatmentRoutes;
