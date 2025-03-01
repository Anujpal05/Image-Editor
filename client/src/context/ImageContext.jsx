import { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [image, setimage] = useState(null);

    return (
        <ImageContext.Provider value={{ image, setimage }}>
            {children}
        </ImageContext.Provider>
    )
}