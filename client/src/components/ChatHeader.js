import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const ChatHeader = ({ user }) => {
    const [cookies, , removeCookie] = useCookies(['user']);
    const [isImageOpen, setIsImageOpen] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const logout = () => {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        window.location.reload();
    };

    const openImage = () => {
        setIsImageOpen(true);
    };

    const closeImage = () => {
        setIsImageOpen(false);
    };

    const redirectToEditProfile = () => {
        // Redirect based on the user role
        if (user.are_you_an === 'investor') {
            navigate('/investor');
        } else if (user.are_you_an === 'advisor') {
            navigate('/advisor');
        }
    };

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container" onClick={openImage}>
                    <img src={user.url} alt={"photo of " + user.name} style={{ borderRadius: '50%' }} />
                </div>
                <h3 style={{ marginRight: '8px' }}>{user.name}</h3>

                {/* Edit Profile Icon */}
                <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-profile-icon"
                    onClick={redirectToEditProfile}
                    style={{ fontSize: '20px', cursor: 'pointer', color: '#ffffff' }}
                />
            </div>

            {isImageOpen && (
                <div className="image-modal" onClick={closeImage}>
                    <img
                        src={user.url}
                        alt={"photo of " + user.name}
                        style={{
                            borderRadius: '50%',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
            )}

            {/* Log Out Icon */}
            <FontAwesomeIcon
                icon={faSignOutAlt}
                className="log-out-icon"
                onClick={logout}
                style={{ fontSize: '20px', cursor: 'pointer', color: '#ffffff' }}
            />
        </div>
    );
};

export default ChatHeader;
