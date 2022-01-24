import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
function Header() {
    return (
        <header className="header">
            <NavLink to="/"><h1 className="header__title">Книга контактов</h1></NavLink>
            <NavLink to="/create"><button className="btn"><AddIcon className="btn__icon" /> Добавить контакт</button></NavLink>
        </header>
    );
}

export default Header;
