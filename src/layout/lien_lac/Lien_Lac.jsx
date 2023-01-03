import React from 'react'
import '../../style/Lien_Lac.scss'

const Lien_Lac = () => {
    return (
        <div className='Lien_Lac'>
            <div className="banner pt-5">
                <div className="container text-center">
                    <p className='title'>Liên lạc với </p>
                    <p className='mail'>SimpleElearn@gmail.com</p>
                </div>
            </div>

            <div className="formll">
                <form className='col-11 col-md-7 col-lg-5 p-3 mx-auto'>
                    <input type="text" placeholder='email@gmail.com'/>
                    <textarea placeholder='nội dung' className='my-4'></textarea>
                    <button type='reset'>
                        gửi
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Lien_Lac
