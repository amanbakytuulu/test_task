import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from 'react-router-dom';

function RecordCreate() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [company, setCompany] = useState('');
    const [account, setAccount] = useState('');
    const [phone, setPhone] = useState('');
    const [site, setSite] = useState('');
    const [date] = useState(new Date());
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [streetA, setStreetA] = useState('');
    const [streetB, setStreetB] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipсode, setZipсode] = useState('');

    const users = JSON.parse(localStorage.getItem('users'));

    // method to create a new user and add to the localHost
    const createUser = (e) => {
        e.preventDefault();
        const data = {
            id: users.length + 1,
            name, username, company: { name: company },
            phone, website: site, accountHistory: [{ date, type, account }], email,
            address: { country, city, state, streetA, streetB, zipсode }
        };

        // spread operator to add previous data with new
        const newUsers=[data, ...users];        
        localStorage.setItem('users', JSON.stringify(newUsers));
        history.push("/");
    }
 

    return <div className="recordCreate">
        <form onSubmit={createUser}>
            <header className="recordCreate__title">Создать пользователя</header>
            <div className="recordCreate__items">
                <div className="recordCreate__item">
                    <div className="recordCreate__item-title"><PersonIcon fontSize="large" className="recordCreate__item-icon" /><p>Личные данные</p></div>
                    <div><p>Id:</p> <input type="number" value={users.length + 1} disabled /></div>
                    <div><p>Имя:</p> <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/></div>
                    <div><p>Никнейм:</p> <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/></div>
                </div>
                <div className="recordCreate__item">
                    <div className="recordCreate__item-title"><PersonIcon fontSize="large" className="recordCreate__item-icon" /><p>Компания</p></div>
                    <div><p>Компания:</p> <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} /></div>
                    <div><p>Номер счета:</p> <input type="number" value={account} onChange={(e) => setAccount(e.target.value)} /></div>
                    <div><p>Тип:</p> <input type="text" value={type} onChange={(e) => setType(e.target.value)} /></div>
                </div>
                <div className="recordCreate__item">
                    <div className="recordCreate__item-title"><PersonIcon fontSize="large" className="recordCreate__item-icon" /><p>Дополнительно</p></div>
                    <div><p>Номер:</p> <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required/></div>
                    <div><p>Web:</p> <input type="text" value={site} onChange={(e) => setSite(e.target.value)} /></div>
                    <div><p>E-mail:</p> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div>
                    <div><p>Дата:</p> <input type="email" value={date} disabled /></div>
                </div>
                <div className="recordCreate__item">
                    <div className="recordCreate__item-title"><PersonIcon fontSize="large" className="recordCreate__item-icon" /><p>Локация</p></div>
                    <div><p>Страна:</p> <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required/></div>
                    <div><p>Cтолица:</p><input type="text" value={city} onChange={(e) => setCity(e.target.value)} required/></div>
                    <div><p>Государство:</p><input type="text" value={state} onChange={(e) => setState(e.target.value)} required/></div>
                    <div><p>ZipCode:</p> <input type="text" value={zipсode} onChange={(e) => setZipсode(e.target.value)} /></div>
                    <div><p>Адрес (1):</p> <input type="text" value={streetA} onChange={(e) => setStreetA(e.target.value)} required/></div>
                    <div><p>Адрес (2):</p> <input type="text" value={streetB} onChange={(e) => setStreetB(e.target.value)} /></div>
                </div>
            </div>
            <footer className="recordCreate__footer">
                <button type="submit" className="btn btn--save">Сохранить и выйти</button>
                <button className="btn btn--close" onClick={() => history.push("/")}>Отмена</button>
            </footer>
        </form>

    </div>;
}
export default RecordCreate;
