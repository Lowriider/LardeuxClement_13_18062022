import {useEffect, useState} from "react";
import Transaction from "../Components/Transaction";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "../Components/Request";

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isEditProfilVisible, setIsEditProfilVisible] = useState(false)

    const userAuth = useSelector((state) => state.login)
    const userData = useSelector((state) => state.profile)
    const error = useSelector((state) => state.profile)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        validation_error: '',
    })

    useEffect(() => {
        if (!userAuth.isAuth) {
            navigate('/')
        }
    }, [userData.isAuth, navigate])

    const handleSubmitUpdateProfile = (e) => {
        e.preventDefault()
        if (formData.firstName.length > 2 && formData.lastName.length > 2) {
            dispatch(updateProfile(userAuth.token, formData.firstName, formData.lastName))
            setIsEditProfilVisible(false)
        } else {
            setFormData({...formData, validation_error: "Firstname/lastname must be at least 3 characters long"})
        }
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                {
                    !isEditProfilVisible ?
                        <>
                            <h1>Welcome back<br/>{userData.firstName} {userData.lastName}!</h1>
                            <button onClick={() => setIsEditProfilVisible(true)} className="edit-button">Edit Name
                            </button>
                        </> :
                        <>
                            <h1>Welcome back</h1>
                            <div>
                                <div>
                                    <input className="input-update" type="text" placeholder={userData.firstName}
                                           onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
                                    <input className="input-update" type="text" placeholder={userData.lastName}
                                           onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
                                </div>
                                <div className="error-profile-msg">
                                    {error.error}{formData.validation_error}
                                </div>
                                <div>
                                    <button onClick={handleSubmitUpdateProfile} className="update-button">Save</button>
                                    <button onClick={() => setIsEditProfilVisible(false)} className="cancel-button">Cancel</button>
                                </div>
                            </div>
                        </>
                }
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Transaction/>
        </main>
    )
}
export default Profile
