import React from 'react';
import HeaderComponent from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent'
import navBarComponent from '../../components/NavBarComponent'
import {useState, useEffect} from 'react';
import {fetchUserData} from "../../axios/fetchUserData";
import deleteUserData from '../../axios/deleteUserData'
import modifyUserData from '../../axios/modifyUserData'
import createData from '../../axios/createData'

const Plataformas = () => {
    const [plataformas, setPlataformas] = useState([]);
    useEffect (() => {setPlataformas((fetchUserData('/plataformas')))}, []);
    return (
        <div>

        </div>
    );
};

export default Plataformas;
