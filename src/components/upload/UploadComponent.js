import React from 'react';
import { Container } from 'reactstrap';

import UploadForm from './UploadForm';

const UploadComponent = () => {
  return (
    <React.Fragment>
      <div className="page-header">Product Upload</div>
      <Container>
        <UploadForm />
      </Container>
    </React.Fragment>
  );
};

export default UploadComponent;
