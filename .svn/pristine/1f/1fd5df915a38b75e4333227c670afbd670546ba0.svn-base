import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrReservation from './kemr-reservation';
import KemrReservationDetail from './kemr-reservation-detail';
import KemrReservationUpdate from './kemr-reservation-update';
import KemrReservationDeleteDialog from './kemr-reservation-delete-dialog';

const KemrReservationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrReservation />} />
    <Route path="new" element={<KemrReservationUpdate />} />
    <Route path=":id">
      <Route index element={<KemrReservationDetail />} />
      <Route path="edit" element={<KemrReservationUpdate />} />
      <Route path="delete" element={<KemrReservationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrReservationRoutes;
