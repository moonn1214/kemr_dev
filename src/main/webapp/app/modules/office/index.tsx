/**
 * jkmoon
 * 원무 라우트
 */
import ReceptPage from './recept/recept';
import BillPage from './bill/bill';
import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

const OfficeRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="recept" element={<ReceptPage />} />
      <Route path="bill" element={<BillPage />} />
      <Route path=":id">
        <Route path="recept" element={<ReceptPage />} />
        <Route path="bill" element={<BillPage />} />
      </Route>
    </ErrorBoundaryRoutes>
  </div>
);

export default OfficeRoutes;
