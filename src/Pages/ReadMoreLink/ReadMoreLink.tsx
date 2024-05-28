import { useState } from "react";
import { Button} from "@mui/material";

const ReadMoreLink = ({children}: any) => {
    const text = children;

    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    
    return (
        <span>
            {isReadMore ? text.slice(0, 100) : text}
            <Button
                onClick={toggleReadMore}
                size="small"
            >
                {isReadMore ? "...read more" : " show less"}
            </Button>
        </span>
    );
}
export default ReadMoreLink