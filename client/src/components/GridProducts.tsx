const ProductCard = () => {
  return (
    <article className='max-w-[15rem] w-full h-[20rem] bg-primary'></article>
  );
};

const GridProducts = () => {
  return (
    <main className='scroll overflow-y-auto bg-gray-200 p-10 w-full h-full max-h-[calc(100vh-80px)]'>
      <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
        {Array.from({ length: 30 }).map(() => (
          <ProductCard></ProductCard>
        ))}
      </div>
    </main>
  );
};

export default GridProducts;
