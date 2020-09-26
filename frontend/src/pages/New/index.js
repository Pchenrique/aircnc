import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New() {
    const history = useHistory();

    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    async function hadleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })
    
        history.push('/dashboard');
    }

    return (
        <form onSubmit={hadleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="selecione a img" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrivel"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Empresa * <span>(separadas por virgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor diaria * <span>(em branco para gratuito)</span></label>
            <input 
                id="price"
                placeholder="Valor por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}