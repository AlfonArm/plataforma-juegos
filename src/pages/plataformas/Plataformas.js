import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import navBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import fetchUserData from '../../axios/fetchUserData'
import deleteUserData from '../../axios/deleteUserData'
import modifyUserData from '../../axios/modifyUserData'
import createData from '../../axios/createData'

const Plataformas = () => {
    const [plataformas, setPlataformas] = useState([]);
    useEffect (() => {setPlataformas((fetchUserData('/plataformas')))}, []);
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <navBarComponent></navBarComponent>
            <div>
                {
                    plataformas.map ( (platKey, plataforma) => {
                        return (
                            <div key={platKey}>
                                <div className='interface'>
                                    <img class ='interface_image' src = '../../styles/modify'/>
                                    <img class ='interface_image' src = '../../styles/delete'/>
                                </div>
                                <p>{plataforma}</p>
                            </div>
                        )
                    })
                }
            </div>
            <FooterComponent></FooterComponent>
        </div>
    );
};

export default Plataformas;