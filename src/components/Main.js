require('normalize.css');
require('styles/App.css');

import React from 'react';
import * as bootstrap from 'react-bootstrap';

var Grid = bootstrap.Grid;
var Row = bootstrap.Row;
var Col = bootstrap.Col;

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
    
  render() {
    return (
      <div className="index">
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={8}>A</Col>
              <Col xs={6} md={4}>B</Col>
            </Row>
          </Grid>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
