import React, { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink } from 'react-router-dom';

function Records() {

    const [state, setState] = useState([]);
    const [filtered, setFilter] = useState([]);
    const [value, setValue] = useState("");


    useEffect(() => {
        setTimeout(() => {
            const items = localStorage.getItem('users');
            setState(JSON.parse(items));
        }, 50)
    }, [])

    useEffect(() => {
        setFilter(state.filter(({ name, phone, email }) => (
            name.toLowerCase().indexOf(value.toLowerCase().trim()) > -1 ||
            phone.toLowerCase().indexOf(value.toLowerCase().trim()) > -1 ||
            email.toLowerCase().indexOf(value.toLowerCase().trim()) > -1)
        ))

    }, [value, state])


    const sortFirstLetter = () => {
        setFilter(state.sort(function (left, right) {
            if (left.name[0] < right.name[0]) return -1;
            if (left.name[0] > right.name[0]) return 1;
            return 0;
        }))
    }

    const onDeleteUser = (id) => {
        const isDelete = window.confirm('Вы точно хотите удалить?');
        if (isDelete) {
            const users = state.filter(user => user.id !== id);
            setState(users);
            localStorage.setItem('users', JSON.stringify(users));
        }

    }

    return (
        <div className="records" >
            <div className="records__top">
                <div className="records__input">
                    <div>
                        <SearchIcon className="records__search" />
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                        <CloseIcon className="records__reset" onClick={() => setValue('')} />
                    </div>
                    <button className="btn btn--search">Искать</button>
                </div>

                <div className="records__appearance">
                    <LightModeIcon fontSize="large" className="records__theme" />
                </div>
            </div>
            <div className="records__group">
                <span>Сортировать по:</span>
                <button className="btn btn--sort" onClick={sortFirstLetter}> Имя</button>
            </div>
            <div className="records__body">
                <table width="100%" cellPadding="5px" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>Компания</th>
                            <th>Телефон</th>
                            <th>Страна</th>
                            <th>Город</th>
                            <th>Создан</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filtered.length ? filtered.map((user, index) => (
                                <tr key={user.id}>
                                    <td >{index + 1}.</td>
                                    <td >{user.name}
                                        <div><a className="email" href={`mailto:${user.email}`}>{user.email}</a></div>
                                    </td>
                                    <td>{user.company.name}</td>
                                    <td><a href={`tel:${user.phone}`} title={`${user.phone}`}>{user.phone}</a></td>
                                    <td>{user.address.country}</td>
                                    <td>{user.address.city}</td>
                                    <td>{new Date(user.accountHistory[0].date).toLocaleDateString()}</td>
                                    <td><NavLink to={`/${user.id}`}><EditIcon fontSize="small" /></NavLink></td>
                                    <td><DeleteIcon fontSize="small" onClick={() => onDeleteUser(user.id)} /></td>
                                </tr>
                            ))
                                :
                                (
                                    <tr>
                                        <td className="empty">No users</td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Records;
