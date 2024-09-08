import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const DashboardCustomer = () => {

  return (
    <Fragment>
      <section className="container">
          <h1 className="large text-primary">Dashboard del Cliente</h1>
      </section>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(DashboardCustomer);