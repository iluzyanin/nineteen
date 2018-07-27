import React from 'react';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';
import './controls.css';

const Controls = (props) => (
  <div className="Controls">
    <Button bsStyle="primary" onClick={props.refill}>
      Refill <Glyphicon glyph="equalizer"></Glyphicon>
    </Button>
    <Button bsStyle="danger" onClick={props.restart}>
      Restart <Glyphicon glyph="refresh"></Glyphicon>
    </Button>
  </div>
);

export default Controls;
