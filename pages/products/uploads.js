import Layout from '../../src/components/layout/Layout';
import UploadedProductContainer from '../../src/container/products/UploadedProductsContainer';
import withAuthentication from '../../lib/withAuthentication';
import withAuthorization from '../../lib/withAuthorization';
import { SELLER } from '../../lib/constants';

function Uploads() {
  return (
    <Layout>
      <UploadedProductContainer />
    </Layout>
  );
}

export default withAuthentication(withAuthorization(SELLER)(Uploads));
