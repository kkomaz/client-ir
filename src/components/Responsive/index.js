import React from 'react'
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={690} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={689} />;
const Default = props => <Responsive {...props} minWidth={690} />;

export {
  Desktop,
  Tablet,
  Mobile,
  Default,
}
