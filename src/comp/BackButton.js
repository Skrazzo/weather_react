import React from 'react';
import { ArrowLeftShort } from 'react-bootstrap-icons';

export default function BackButton() {
    return (
        <button onClick={() => {window.location.href = "../"}} className='back_btn'><ArrowLeftShort/> Go back</button>
    )
}
