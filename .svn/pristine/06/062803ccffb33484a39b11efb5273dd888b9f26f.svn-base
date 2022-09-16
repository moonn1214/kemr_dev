import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import KemrInstitution from './kemr-institution';
import KemrInstitutionDetail from './kemr-institution-detail';
import KemrInstitutionUpdate from './kemr-institution-update';
import KemrInstitutionDeleteDialog from './kemr-institution-delete-dialog';

const KemrInstitutionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<KemrInstitution />} />
    <Route path="new" element={<KemrInstitutionUpdate />} />
    <Route path=":id">
      <Route index element={<KemrInstitutionDetail />} />
      <Route path="edit" element={<KemrInstitutionUpdate />} />
      <Route path="delete" element={<KemrInstitutionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default KemrInstitutionRoutes;
