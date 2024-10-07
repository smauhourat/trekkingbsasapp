import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import BookList from '../../components/customer/BookList';

const DashboardCustomer = () => {

  return (
    <Fragment>
      {/* <section className="container">
          <h1 className="large text-primary">Dashboard del Cliente</h1>
      </section> */}
      <BookList />
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(DashboardCustomer);