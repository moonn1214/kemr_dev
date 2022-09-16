import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrDoctor from './kemr-doctor';
import KemrDoctorDetail from './kemr-doctor-detail';
import KemrDoctorUpdate from './kemr-doctor-update';
import KemrDoctorDeleteDialog from './kemr-doctor-delete-dialog';

const KemrDoctorRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrDoctor />} />
    <Route path="new" element={<KemrDoctorUpdate />} />
    <Route path=":id">
      <Route index element={<KemrDoctorDetail />} />
      <Route path="edit" element={<KemrDoctorUpdate />} />
      <Route path="delete" element={<KemrDoctorDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrDoctorRoutes;
