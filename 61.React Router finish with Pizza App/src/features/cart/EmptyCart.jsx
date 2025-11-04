import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className='font-semibold mt-4 px-4 py-3'>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
