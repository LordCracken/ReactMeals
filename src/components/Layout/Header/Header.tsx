import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

import classes from './Header.module.css';

import mealsImage from '../../../assets/meals.jpg';

interface HeaderProps {
  onShowCart: () => void;
}

const Header = ({ onShowCart }: HeaderProps) => (
  <>
    <header className={classes.header}>
      <h1>ReactMeals</h1>
      <HeaderCartButton onClick={onShowCart} />
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt="A table full of delicious food!" />
    </div>
  </>
);

export default Header;
