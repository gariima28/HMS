import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const IconPicker = ({ value, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(value);

    const icons = [
        "fas fa-ad",
        "fas fa-home",
        "fas fa-car",
        "fas fa-bicycle",
        "fas fa-bell",
        "fas fa-camera",
        "fas fa-heart",
        // Add more FontAwesome icons here
    ];

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        onChange(icon);
        setShowPicker(false);
    };

    return (
        <div style={{ position: "relative" }}>
            <div
                onClick={() => setShowPicker(!showPicker)}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "0px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <span style={{ padding: '0px 0px 0px 12px' }}>{selectedIcon || "Select an icon"}</span>
                <i className={selectedIcon} style={{ height: '100%', borderRadius: "0px 4px 4px 0px", padding: selectedIcon ? "14px" : "20px", backgroundColor: '#edebeb' }}></i>
                {/* <i className="fas fa-chevron-down"></i> */}
            </div>

            {showPicker && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "8px",
                        zIndex: 3199,
                        overflow: 'auto'
                    }}
                >
                    {icons.map((icon) => (
                        <div
                            key={icon}
                            onClick={() => handleIconClick(icon)}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                textAlign: "center",
                                border: selectedIcon === icon ? "2px solid blue" : "1px solid #ccc",
                                borderRadius: "4px",
                            }}
                        >
                            <i className={icon} style={{ fontSize: "24px" }}></i>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IconPicker;
