import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrMedicalBill from './kemr-medical-bill';
import KemrMedicalBillDetail from './kemr-medical-bill-detail';
import KemrMedicalBillUpdate from './kemr-medical-bill-update';
import KemrMedicalBillDeleteDialog from './kemr-medical-bill-delete-dialog';

const KemrMedicalBillRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrMedicalBill />} />
    <Route path="new" element={<KemrMedicalBillUpdate />} />
    <Route path=":id">
      <Route index element={<KemrMedicalBillDetail />} />
      <Route path="edit" element={<KemrMedicalBillUpdate />} />
      <Route path="delete" element={<KemrMedicalBillDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrMedicalBillRoutes;
