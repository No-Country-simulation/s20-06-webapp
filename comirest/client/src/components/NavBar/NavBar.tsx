import React, { useState } from 'react'

export const NavBar = () => {

    const [selectedFilter, setSelectedFilter] = useState('PLATOS DEL DIA');

    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter)
    };

    const filters = ['PLATOS DEL DIA', 'PASTAS', 'BEBIDAS', 'POSTRES', 'DESAYUNOS'];

    return (
        <ul className='flex justify-between p-10 mb-5 text-comiRed font-poppins'>
            {
                filters.map((filter) => (
                    <li
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                        className={`cursor-pointer box-border ${selectedFilter === filter
                            ? "border-b-2 border-comiRed duration-200 ease-in"
                            : "border-b-2 border-transparent"}`}
                    >
                        {filter}

                    </li>
                ))

            }

        </ul>
    )
}
