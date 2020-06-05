import React from 'react';
import { connect } from "react-redux";

const HomePage = () => {
    return (<div> This is the homepage</div>
    )
}

const mapStateToProps = (state) => {
   return  {tournaments: state.tournaments}
}
export default connect(mapStateToProps)(HomePage)