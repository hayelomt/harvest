import Layout from '../src/components/layout/Layout';
import UploadComponent from '../src/components/upload/UploadComponent';
import withAuthentication from '../lib/withAuthentication';
import withAuthorization from '../lib/withAuthorization';
import { SELLER } from '../lib/constants';

const Upload = () => {
  return (
    <Layout>
      <UploadComponent />
    </Layout>
  );
};

export default withAuthentication(withAuthorization(SELLER)(Upload));
