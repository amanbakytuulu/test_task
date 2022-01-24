import React, { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useParams, useHistory } from 'react-router-dom';

function RecordEdit() {
    //take the user id 
    const { uid } = useParams();

    const history = useHistory();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [company, setCompany] = useState('');
    const [account, setAccount] = useState('');
    const [phone, setPhone] = useState('');
    const [site, setSite] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [streetA, setStreetA] = useState('');
    const [streetB, setStreetB] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipсode] = useState('');


    const users = JSON.parse(localStorage.getItem('users'));

    const currentUser = users.find((user) => user.id === parseInt(uid));

    // method to add changed state
    const editUser = () => {
        const data = {
            id: parseInt(uid),
            name, username, company: { name: company },
            phone, website: site, accountHistory: [{ date, type, account }], email,
            address: { country, city, state, streetA, streetB, zipcode }
        };
        const updateState = users.map((user) => user.id === parseInt(uid) ? data : user)
        localStorage.setItem('users', JSON.stringify(updateState));

        // back to the main page
        history.push("/");
    }

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setUsername(currentUser.username);
            setCompany(currentUser.company.name);
            setAccount(currentUser.accountHistory[0].account);
            setType(currentUser.accountHistory[0].type);
            setPhone(currentUser.phone);
            setSite(currentUser.website);
            setEmail(currentUser.email);
            setDate(new Date(currentUser.accountHistory[0].date).toLocaleDateString());
            setCountry(currentUser.address.country);
            setState(currentUser.address.state);
            setCity(currentUser.address.city);
            setZipсode(currentUser.address.zipсode);
            setStreetA(currentUser.address.streetA);
            setStreetB(currentUser.address.streetB);
        }
    }, [])
 
    return <div className="recordEdit">
        <header className="recordEdit__title">Редактирование</header>
        <div className="recordEdit__items">
            <div className="recordEdit__item">
                <div className="recordEdit__item-title"><PersonIcon fontSize="large" className="recordEdit__item-icon" /><p>Личные данные</p></div>
                <div><p>Id:</p> <input type="number" value={uid} disabled /></div>
                <div><p>Имя:</p> <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div><p>Никнейм:</p> <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
            </div>
            <div className="recordEdit__item">
                <div className="recordEdit__item-title"><PersonIcon fontSize="large" className="recordEdit__item-icon" /><p>Компания</p></div>
                <div><p>Компания:</p> <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} /></div>
                <div><p>Номер счета:</p> <input type="number" value={account} onChange={(e) => setAccount(e.target.value)} /></div>
                <div><p>Тип:</p> <input type="text" value={type} onChange={(e) => setType(e.target.value)} /></div>
            </div>
            <div className="recordEdit__item">
                <div className="recordEdit__item-title"><PersonIcon fontSize="large" className="recordEdit__item-icon" /><p>Дополнительно</p></div>
                <div><p>Номер:</p> <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
                <div><p>Web:</p> <input type="text" value={site} onChange={(e) => setSite(e.target.value)} /></div>
                <div><p>E-mail:</p> <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div><p>Дата:</p> <input type="email" value={date} disabled /></div>
            </div>
            <div className="recordEdit__item">
                <div className="recordEdit__item-title"><PersonIcon fontSize="large" className="recordEdit__item-icon" /><p>Локация</p></div>
                <div><p>Страна:</p> <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required /></div>
                <div><p>Cтолица:</p><input type="text" value={city} onChange={(e) => setCity(e.target.value)} required /></div>
                <div><p>Государство:</p><input type="text" value={state} onChange={(e) => setState(e.target.value)} required /></div>
                <div><p>ZipCode:</p> <input type="text" value={zipcode} onChange={(e) => setZipсode(e.target.value)} /></div>
                <div><p>Адрес (1):</p> <input type="text" value={streetA} onChange={(e) => setStreetA(e.target.value)} required /></div>
                <div><p>Адрес (2):</p> <input type="text" value={streetB} onChange={(e) => setStreetB(e.target.value)} /></div>
            </div>
        </div>
        <footer className="recordEdit__footer">
            <button className="btn btn--save" onClick={editUser}>Сохранить</button>
            <button className="btn btn--close" onClick={() => history.push("/")}>Отмена</button>
        </footer>
    </div>;
}

export default RecordEdit;
