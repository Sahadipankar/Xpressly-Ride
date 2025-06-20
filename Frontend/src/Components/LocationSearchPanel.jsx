import React from 'react'

const LocationSearchPanel = (props) => {



    const locations = [
        "33, Ballygunge Place, Ballygunge, Kolkata, West Bengal 700019",
        "8/1, Loudon Street, Elgin, Kolkata, West Bengal 700017",
        "1, Shakespeare Sarani, Park Street Area, Kolkata, West Bengal 700071",
        "6, Camac Street, Park Street Area, Kolkata, West Bengal 700017",
        "1, Raja Subodh Chandra Mullick Rd, Jadavpur, Kolkata, West Bengal 700032",
    ]


    return (
        <div>
            {
                locations.map((elem, idx) => {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true);
                        props.setPanelOpen(false);
                    }} className='flex gap-3 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-small'>{elem}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel