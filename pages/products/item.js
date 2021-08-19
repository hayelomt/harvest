import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/Layout';
import ProductsPageContainer from '../../src/container/products/ProductsPageContainer';

function Item() {
  const router = useRouter();
  let { category, _id } = router.query;
  const isDetailed = true;
  const index = '0';
  if (category === undefined) {
    category = 'ALL';
  }
  return (
    <Layout>
      <ProductsPageContainer
        category={category}
        _id={_id}
        isDetailed={isDetailed}
        index={index}
      />
    </Layout>
  );
}

export default Item;
