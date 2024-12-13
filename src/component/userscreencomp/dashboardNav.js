import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ResponsiveHeader = ({ showmenuHandler, headerTitle }) => {
    const navigate = useNavigate();
    const { color } = useSelector(state => state.userAuth);

    const navigateHandler = (data) => {
        navigate(data);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 20px',
                backgroundColor: color.background || '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow to give it depth
                flexWrap: 'wrap', // Allow wrapping for small screens
                borderRadius: '10px', // Rounded corners for a modern feel
                marginBottom: '20px', // Space at the bottom for better separation from content
            }}
        >
            {/* Left section with title */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <h3
                    style={{
                        color: color.importantText || '#3a4d6c',
                        fontSize: '1.8rem',
                        margin: 0,
                        whiteSpace: 'nowrap', // Prevent text from wrapping
                        fontWeight: '600', // Make it bold for prominence
                        letterSpacing: '0.5px', // Slight letter spacing for style
                    }}
                >
                    {headerTitle || 'Dashboard'}
                </h3>
            </div>

            {/* Right section for profile and menu icon */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '20px',
                    flex: '0 1 auto', // Prevent overflowing and ensure flexibility
                }}
            >
                {/* Menu Icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                    }}
                >
                    
                </div>

                {/* Profile Image Icon */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span
                        className="material-icons"
                        onClick={() => navigateHandler('/profilesettings')}
                        style={{
                            backgroundColor: color.fadeButtonColor || '#3a4d6c',
                            color: color.importantText || '#fff',
                            fontSize: '2rem',
                            padding: '14px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a2f4f'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = color.fadeButtonColor || '#3a4d6c'}
                        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        person
                    </span>
                </div>
            </div>
        </div>
    );
};




