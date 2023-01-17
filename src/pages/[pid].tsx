import React from "react";

function ProductDetailsPage(props) {
  return (
    <>
      <h1>{props.loadedProduct.name}</h1>
      <p>{props.loadedProduct.description}</p>
    </>
  );
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [
        {
          params: {
            pid: "p1",
          },
        },
        {
          params: {
            pid: "p2",
          },
        },
        {
          params: {
            pid: "p3",
          },
        },
      ],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const { pid } = params;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = fs.readFileSync(filePath);
  const data: PropType = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === pid);

  return {
    props: {
      // props for your component
      loadedProduct: product,
    },
    revalidate: 120, // rerun process to get the latest updates on sertver side
  };
}

export default ProductDetailsPage;
