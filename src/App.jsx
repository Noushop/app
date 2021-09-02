import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

import { KitTheme } from '@my2rela/react-kit';

import LayoutMain from './components/layouts/main/LayoutMain';
import LayoutSubMain from './components/layouts/subMain/LayoutSubMain';
import subMenu from './routes/subMenuRoutes';

import Home from './pages/home/Home';
import Board from './pages/board/Board';
import CashierPage from './pages/cashier/CashierPage';
import InventoriesListPage from './pages/inventories/list/InventoriesListPage';
import InventorieDetailsPage from './pages/inventories/details/InventorieDetailsPage';
import InventoriesPage from './pages/inventories/add/InventorieAddPage';
import TicketsPage from './pages/stats/tickets/TicketsPage';
import TicketPage from './pages/ticket/TicketPage';
import PurchasesPage from './pages/stats/purchases/PurchasesPage';
import UserAddPage from './pages/users/add/UserAddPage';
import NotFound from './pages/errors/notFound/NotFound';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <KitTheme>
        <Switch>
          {/* Main Layout */}
          <RouterWrapper exact path="/board" menu={subMenu.inventories} layout={LayoutMain}><Board /></RouterWrapper>
          <RouterWrapper exact path="/inventories" menu={subMenu.inventories} layout={LayoutMain}><InventoriesListPage /></RouterWrapper>
          <RouterWrapper exact path="/inventories/add-inventorie" menu={subMenu.inventories} layout={LayoutMain}><InventoriesPage /></RouterWrapper>
          <RouterWrapper exact path="/inventories/inventorie/:barcode" menu={subMenu.inventories} layout={LayoutMain}><InventorieDetailsPage /></RouterWrapper>
          <RouterWrapper exact path="/tickets" menu={subMenu.stats} layout={LayoutMain}><TicketsPage /></RouterWrapper>
          <RouterWrapper exact path="/ticket/:ticketNumber" menu={subMenu.stats} layout={LayoutMain}><TicketPage /></RouterWrapper>
          <RouterWrapper exact path="/purchases" menu={subMenu.stats} layout={LayoutMain}><PurchasesPage /></RouterWrapper>
          <RouterWrapper exact path="/users/add" menu={subMenu.users} layout={LayoutMain}><UserAddPage /></RouterWrapper>

          {/* Sub Main Layout */}
          <RouterWrapper exact path="/cashier" layout={LayoutSubMain}><CashierPage /></RouterWrapper>

          {/* No Layout */}
          <Route exact path="/"><Home /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </KitTheme>
    </BrowserRouter>
  </div>
);

const RouterWrapper = (props) => {
  const {
    layout: Layout,
    children,
    menu,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(p) => (
        <Layout {...p} menu={menu}>
          {children}
        </Layout>
      )}
    />
  );
};

export default App;
