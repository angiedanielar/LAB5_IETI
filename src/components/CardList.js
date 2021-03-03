import React, { useState, useEffect } from 'react';
import OutlinedCard from './OutlinedCard';
import ResponsiveDrawer from './ResponsiveDrawer';
import { Button } from '@material-ui/core';
import { Filter } from './Filter';

const CardList = ({items}) => {

    let list = items

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [filters, setFilters] = useState({
        dueDate: null,
        status: "",
        responsible: ""
    });

    const handleFilters = (filters) => {
        setFilters(filters);
    };

    if (filters.status !== "") {
        list = list.filter(item => item.status === filters.status);
    }
    if (filters.responsible !== "") {
        list = list.filter(item => item.responsible.name === filters.responsible);
    }

    return (
        <div>
            <Button
                onClick={handleOpenModal}
                variant="contained"
                color="primary">
                Filtrar
            </Button>
            <br></br>
            <br></br>
            {list.map((element, i) => (<OutlinedCard description={element.description}
                responsible={element.responsible} status={element.status} dueDate={element.dueDate} />))}
            <Filter open={openModal} closeAction={handleCloseModal} filter={handleFilters} />
        </div>
    )
}

export default CardList;
