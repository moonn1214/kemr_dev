import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrMedicine from './kemr-medicine';
import KemrMedicineDetail from './kemr-medicine-detail';
import KemrMedicineUpdate from './kemr-medicine-update';
import KemrMedicineDeleteDialog from './kemr-medicine-delete-dialog';

const KemrMedicineRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrMedicine />} />
    <Route path="new" element={<KemrMedicineUpdate />} />
    <Route path=":id">
      <Route index element={<KemrMedicineDetail />} />
      <Route path="edit" element={<KemrMedicineUpdate />} />
      <Route path="delete" element={<KemrMedicineDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrMedicineRoutes;
