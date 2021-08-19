import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/Layout';
import ProductsPageContainer from '../../src/container/products/ProductsPageContainer';

function Index() {
  const router = useRouter();
  let { category, index, isDetailed } = router.query;
  if (category === undefined || index === undefined) {
    category = 'ALL';
    index = 0;
  }
  if (isDetailed === undefined || isDetailed === false) {
    isDetailed = false;
  }
  return (
    <Layout>
      <ProductsPageContainer
        category={category}
        index={index}
        isDetailed={isDetailed}
      />
    </Layout>
  );
}

export default Index;
